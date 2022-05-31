import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

import { UserService } from 'src/user/user.service';
import type { Token } from './token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await compare(pass, user.hash))) {
      return user;
    }
    throw new UnauthorizedException('Password did not match!');
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '15d' }),
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync<Token>(token);
      if (!decoded) {
        throw new UnauthorizedException('Refresh Token invalid!');
      }

      const user = await this.usersService.findByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('User Not Found!');
      }

      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid token!');
    }
  }
}
