import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteResolver } from './note.resolver';
import { Prisma } from 'src/prisma';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [NoteResolver, NoteService, Prisma],
  exports: [NoteService],
})
export class NoteModule {}
