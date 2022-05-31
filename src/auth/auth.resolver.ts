import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { hash as hashPassword, genSalt } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Cookie } from './decorators/cookie.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateAccountInput } from './dto/create-account.input';
import { LoginInput } from './dto/login.input';
import { Auth } from './entities/auth.entity';
import { Token } from './entities/token.entity';
import { JwtAuthGuard } from './jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Auth)
  async createAccount(
    @Context() ctx,
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

    ctx.reply.setCookie('accessToken', token.accessToken, { httpOnly: true });
    ctx.reply.setCookie('refreshToken', token.refreshToken, { httpOnly: true });

    return { ...user, ...token };
  }

  @Mutation(() => Auth)
  async login(@Context() ctx, @Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );
    const token = await this.authService.login(user);

    ctx.reply.setCookie('accessToken', token.accessToken, { httpOnly: true });
    ctx.reply.setCookie('refreshToken', token.refreshToken, { httpOnly: true });

    return { ...user, token };
  }

  @Mutation(() => Auth)
  @UseGuards(JwtAuthGuard)
  logout(@Context() ctx, @CurrentUser() user: User) {
    ctx.reply.clearCookie('accessToken');
    ctx.reply.clearCookie('refreshToken');

    return user;
  }

  @Mutation(() => Token)
  async refresh(@Context() ctx, @Cookie('refreshToken') refreshToken: string) {
    const token = await this.authService.refreshToken(refreshToken);

    ctx.reply.setCookie('accessToken', token.accessToken, { httpOnly: true });
    ctx.reply.setCookie('refreshToken', token.refreshToken, { httpOnly: true });

    return token;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }
}
