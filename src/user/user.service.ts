import { Inject, Injectable } from '@nestjs/common';

import { Prisma } from 'src/prisma';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@Inject(Prisma) private readonly prisma: Prisma) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        emali: createUserInput.email,
        name: createUserInput.name,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
