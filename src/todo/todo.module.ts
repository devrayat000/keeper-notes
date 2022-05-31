import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Prisma } from 'src/prisma';
import { NoteModule } from 'src/note/note.module';

@Module({
  imports: [NoteModule],
  providers: [TodoResolver, TodoService, Prisma],
})
export class TodoModule {}
