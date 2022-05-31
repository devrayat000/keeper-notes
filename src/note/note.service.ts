import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { Prisma } from 'src/prisma';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: Prisma) {}

  create(todoId: string, createNoteInput: CreateNoteInput) {
    return this.prisma.note.create({
      data: {
        ...createNoteInput,
        todoId,
      },
    });
  }

  findAll(todoId: string) {
    return this.prisma.note.findMany({
      where: {
        todoId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.note.findUnique({
      where: {
        id,
      },
    });
  }

  readonly findLoaded = new DataLoader(async (ids: string[]) => {
    const notes = await this.prisma.note.findMany({
      where: {
        todoId: {
          in: ids,
        },
      },
    });

    return ids.map((id) => notes.filter((note) => note.todoId === id));
  });

  update(id: string, updateNoteInput: UpdateNoteInput) {
    return this.prisma.note.update({
      data: updateNoteInput,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
