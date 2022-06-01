import { Inject, Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

import { Prisma } from 'src/prisma';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(@Inject(Prisma) private readonly prisma: Prisma) {}

  create(user: string, createTodoInput: CreateTodoInput) {
    return this.prisma.todo.create({
      data: {
        ...createTodoInput,
        userId: user,
      },
    });
  }

  findAll(user: string) {
    return this.prisma.todo.findMany({
      where: {
        userId: user,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  readonly findLoaded = new DataLoader(async (ids: string[]) => {
    const todos = await this.prisma.todo.findMany({
      where: {
        labels: {
          every: {
            id: {
              in: ids,
            },
          },
        },
      },
      include: { labels: { select: { id: true } } },
    });

    return ids.map((id) =>
      todos.filter((todo) => todo.labels.some((label) => label.id === id)),
    );
  });

  update(id: string, updateTodoInput: UpdateTodoInput) {
    return this.prisma.todo.update({
      data: updateTodoInput,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }

  async copy(id: string) {
    const { id: todoId, ...todo } = await this.prisma.todo.findUnique({
      where: { id },
    });

    return this.prisma.todo.create({
      data: todo,
    });
  }
}
