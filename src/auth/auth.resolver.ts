import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { hash as hashPassword, genSalt } from 'bcrypt';
import { FastifyReply } from 'fastify';
import { PubSub } from 'mercurius';
import { User } from 'src/user/entities/user.entity';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CookieService } from './cookie/cookie.service';
import { Cookie } from './decorators/cookie.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateAccountInput } from './dto/create-account.input';
import { LoginInput } from './dto/login.input';
import { Auth } from './entities/auth.entity';
import { Token } from './entities/token.entity';
import { JwtAuthGuard } from './jwt.guard';
import { RefreshGuard } from './refresh.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
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

    this.cookieService.setAuth(ctx.reply, token);

    return { ...user, ...token };
  }

  @Mutation(() => Auth)
  async login(@Context() ctx, @Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password,
    );
    const token = await this.authService.login(user);

    this.cookieService.setAuth(ctx.reply, token);

    return { ...user, token };
  }

  @Mutation(() => Auth)
  @UseGuards(JwtAuthGuard)
  logout(@Context() ctx, @CurrentUser() user: User) {
    ctx.reply.clearCookie('kp.token.access');
    ctx.reply.clearCookie('kp.token.refresh');

    return user;
  }

  @Mutation(() => Token)
  async refresh(
    @Context() ctx,
    @Cookie('kp.token.refresh') refreshToken: string,
  ) {
    const token = await this.authService.refreshToken(refreshToken);

    this.cookieService.setAuth(ctx.reply, token);

    return token;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  async me(@CurrentUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  async toggleDarkMode(
    @CurrentUser() user: User,
    @Context('pubsub') pubsub: PubSub,
  ) {
    const result = await this.userService.toggleDarkMode(
      user.id,
      user.darkMode,
    );

    pubsub.publish({ topic: 'darkModeToggled', payload: result });

    return result;
  }

  @Subscription(() => Boolean, {
    filter(payload, variables) {
      return payload.id === variables.id;
    },
  })
  @UseGuards(JwtAuthGuard, RefreshGuard)
  async darkModeToggled(
    @Args('id', { type: () => ID }) id: string,
    @Context('pubsub') pubsub: PubSub,
  ) {
    return pubsub.subscribe('darkModeToggled');
  }
}
