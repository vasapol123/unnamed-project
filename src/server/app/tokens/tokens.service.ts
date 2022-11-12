import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/server/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

import { Tokens } from './interface/tokens.interface';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: ConfigService
  ) {}

  public async createTokens(user: User): Promise<Tokens> {
    const jwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d', 
      }),
    ]);

    return { accessToken, refreshToken };
  }

  public async updateRefreshTokenHash(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken
      }
    });
  }
}