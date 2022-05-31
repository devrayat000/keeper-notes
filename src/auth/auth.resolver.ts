import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { hash as hashPassword, genSalt } from 'bcrypt';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { CreateAccountInput } from './dto/create-account.input';
import { LoginInput } from './dto/login.input';
import { Auth } from './entities/auth.entity';
import { JwtAuthGuard } from './jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Auth)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    const salt = await genSalt(12);
    const hash = await hashPassword(createAccountInput.password, salt);

    const user = await this.userService.create({
      email: createAccountInput.email,
      name: createAccountInput.name,
      hash,
      salt,
    });
    const token = await this.authService.login(user);

    return { ...user, ...token };
  }

  @Mutation(() => Auth)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );
    const { access_token } = await this.authService.login(user);

    return { ...user, access_token };
  }

  @Query(() => Auth)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    const { access_token } = await this.authService.login(user);
    return { ...user, access_token };
  }
}
