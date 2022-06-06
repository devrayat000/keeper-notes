import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { RefreshGuard } from './refresh.guard';
import { CookieService } from './cookie/cookie.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '15min' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    RefreshGuard,
    CookieService,
  ],
  exports: [AuthService, CookieService],
})
export class AuthModule {}
