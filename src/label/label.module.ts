import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';
import { Prisma } from 'src/prisma';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [TodoModule],
  providers: [LabelResolver, LabelService, Prisma],
  exports: [LabelService],
})
export class LabelModule {}
