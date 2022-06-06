import { Injectable } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import type { Token } from '../entities/token.entity';

@Injectable()
export class CookieService {
  setAuth(reply: FastifyReply, token: Token) {
    reply.setCookie('kp.token.access', token.accessToken, {
      httpOnly: true,
      maxAge: 60 * 15, // 15 min
    });
    reply.setCookie('kp.token.refresh', token.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 day
    });
  }
}
