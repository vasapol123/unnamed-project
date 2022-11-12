import { Module } from "@nestjs/common";
import { TokensModule } from "../tokens/tokens.module";

import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [TokensModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}