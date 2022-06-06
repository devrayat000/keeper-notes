import { CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { CookieService } from './cookie/cookie.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as FastifyRequest;
    const reply = ctx.getContext().reply as FastifyReply;

    const accessToken = req.cookies['kp.token.access'];
    const token = await this.authService.refreshToken(accessToken);

    this.cookieService.setAuth(reply, token);
    return true;
  }
}
