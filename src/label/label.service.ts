import { Inject, Injectable } from '@nestjs/common';

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
