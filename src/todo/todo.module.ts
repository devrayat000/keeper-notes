import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Prisma } from 'src/prisma';
import { NoteModule } from 'src/note/note.module';
import { LabelModule } from 'src/label/label.module';

@Module({
  imports: [NoteModule, forwardRef(() => LabelModule)],
  providers: [TodoResolver, TodoService, Prisma],
  exports: [TodoService],
})
export class TodoModule {}
