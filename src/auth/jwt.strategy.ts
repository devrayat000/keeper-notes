import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies['kp.token.access'],
      ]),
      ignoreExpiration: false,
      secretOrKey: 'supersecret',
    });
  }

  async validate(payload) {
    return { id: payload.sub, email: payload.email };
  }
}
