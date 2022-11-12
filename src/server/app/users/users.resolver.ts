import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from './models/user.model';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): void {
    // return this.usersService.getUser();
    return
  }

  // @Query(() => [User], { name: 'users', nullable: 'items' })
  // getUsers(@Args() getUsersArgs: GetUsersArgs): Array<User> {
  //   return this.usersService.getUsers();
  // }

  @Mutation(() => User)
  public async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
  //   return this.usersService.updateUser();
  // }

  // @Mutation(() => User)
  // deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
  //   return this.usersService.deleteUser();
  // }
}