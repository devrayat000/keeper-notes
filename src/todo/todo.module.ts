import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Prisma } from 'src/prisma';

@Module({
  providers: [TodoResolver, TodoService, Prisma],
})
export class TodoModule {}
