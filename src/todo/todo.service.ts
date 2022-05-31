import { Inject, Injectable } from '@nestjs/common';
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
