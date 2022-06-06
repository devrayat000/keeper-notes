import { Inject, Injectable } from '@nestjs/common';
import { Prisma as PrismaClient, User } from '@prisma/client';

import { Prisma } from 'src/prisma';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@Inject(Prisma) private readonly prisma: Prisma) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): PrismaClient.Prisma__UserClient<User>;
  findByEmail<Select extends PrismaClient.UserSelect>(
    email: string,
    select: Select,
  ): PrismaClient.Prisma__UserClient<{ [P in keyof User]: User[P] }>;
  findByEmail<Select extends PrismaClient.UserSelect>(
    email: string,
    select?: Select,
  ) {
    return this.prisma.user.findUnique({
      where: { email },
      select: select,
    });
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

  toggleDarkMode(id: string, prev: boolean) {
    return this.prisma.user.update({
      where: { id },
      data: { darkMode: { set: !prev } },
      select: { id: true, darkMode: true },
    });
  }
}
