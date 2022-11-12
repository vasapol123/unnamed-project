import { Injectable, ForbiddenException } from "@nestjs/common";
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

import { CreateUserInput } from "./dto/input/create-user.input";
import { PrismaService } from 'src/server/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const hashedPassword = await argon2.hash(createUserData.password);

    const user = await this.prisma.user.create({
      data: {
        hashedPassword,
        ...createUserData,
      }
    })
    .catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code = 'P2002') {
          throw new ForbiddenException(
            'There is a unique constraint violation, a new user cannot be created with this email'
          );
        }
      }
      throw e;
    })

    return user;
  }

  // public updateUser(): User {

  // }

  // public getUser(): User {

  // }

  // public getUsers(): Array<User> {

  // }

  // public deleteUser(): User {

  // }
}