import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/input/create-user.input";

import { User } from "./models/user";

@Injectable()
export class UsersService {
  private Users: Array<User> = [];

  public createUser(): User {

  }

  public updateUser(): User {

  }

  public getUser(): User {

  }

  public getUsers(): Array<User> {

  }

  public deleteUser(): User {

  }
}