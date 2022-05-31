import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { Prisma } from './prisma';

@Module({
  imports: [
    TodoModule,
    UserModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      include: [UserModule, TodoModule],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Prisma],
})
export class AppModule {}
