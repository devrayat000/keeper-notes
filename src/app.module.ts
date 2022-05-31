import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { Prisma } from './prisma';
import { LabelModule } from './label/label.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    TodoModule,
    UserModule,
    LabelModule,
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'schema.graphql',
      subscription: true,
      graphiql: false,
      ide: false,
      path: '/graphql',
      context: (request, reply) => ({ request, reply }),
    }),
    AuthModule,
    NoteModule,
  ],
  exports: [Prisma],
  controllers: [AppController],
  providers: [AppService, Prisma],
})
export class AppModule {}
