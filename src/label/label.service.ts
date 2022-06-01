import { Inject, Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { Prisma } from 'src/prisma';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Injectable()
export class LabelService {
  constructor(@Inject(Prisma) private readonly prisma: Prisma) {}

  create(user: string, createLabelInput: CreateLabelInput) {
    return this.prisma.label.create({
      data: {
        ...createLabelInput,
        userId: user,
      },
    });
  }

  findAll(user: string) {
    return this.prisma.label.findMany({
      where: { userId: user },
    });
  }

  findOne(id: string) {
    return this.prisma.label.findUnique({
      where: {
        id,
      },
    });
  }

  readonly findLoaded = new DataLoader(async (ids: string[]) => {
    const labels = await this.prisma.label.findMany({
      where: {
        todos: {
          every: {
            id: {
              in: ids,
            },
          },
        },
      },
      include: { todos: { select: { id: true } } },
    });

    return ids.map((id) =>
      labels.filter((label) => label.todos.some((todo) => todo.id === id)),
    );
  });

  update(id: string, updateLabelInput: UpdateLabelInput) {
    return this.prisma.label.update({
      data: updateLabelInput,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
