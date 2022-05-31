import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { Prisma } from 'src/prisma';

@Module({
  providers: [NoteResolver, NoteService, Prisma],
})
export class NoteModule {}
