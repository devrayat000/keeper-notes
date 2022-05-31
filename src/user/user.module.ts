import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Prisma } from 'src/prisma';

@Module({
  providers: [UserResolver, UserService, Prisma],
  exports: [UserService],
})
export class UserModule {}
