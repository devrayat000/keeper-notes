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
      autoSchemaFile: 'schema.graphql',
      subscription: true,
      graphiql: false,
      ide: false,
      path: '/graphql',
    }),
  ],
  exports: [Prisma],
  controllers: [AppController],
  providers: [AppService, Prisma],
})
export class AppModule {}
