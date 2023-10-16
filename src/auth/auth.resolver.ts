import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput, UserLoginInput, UpdateUserInput } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from './jwt.guard';

@Resolver('User')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query('getUsers')
  @UseGuards(JWTAuthGuard)
  async getUserList() {
    return this.authService.users();
  }

  @Query('whoAmI')
  @UseGuards(JWTAuthGuard)
  async whoAmI(@Context() context) {
    return this.authService.user(context.req.user.id);
  }

  @Query('getUser')
  async getUserById(@Args('id') id: string) {
    return this.authService.user(id);
  }

  @Mutation('login')
  async userLogin(@Args('data') data: UserLoginInput) {
    return this.authService.userLogin(data);
  }

  @Mutation('createUser')
  async createUser(@Args('data') args: CreateUserInput) {
    return this.authService.createUser(args);
  }

  @Mutation('updateUser')
  async updateUserInfo(
    @Args('data') args: UpdateUserInput,
    @Context() context,
  ) {
    return this.authService.memberUpdateInfo(args, context.req.user.id);
  }
}
