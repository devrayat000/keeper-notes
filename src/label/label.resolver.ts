import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { LabelService } from './label.service';
import { Label } from './entities/label.entity';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Todo } from 'src/todo/entities/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { RefreshGuard } from 'src/auth/refresh.guard';

@Resolver(() => Label)
export class LabelResolver {
  constructor(
    private readonly labelService: LabelService,
    private readonly todoService: TodoService,
  ) {}

  @Mutation(() => Label)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  createLabel(
    @CurrentUser() user: User,
    @Args('createLabelInput') createLabelInput: CreateLabelInput,
  ) {
    return this.labelService.create(user.id, createLabelInput);
  }

  @Query(() => [Label], { name: 'labels' })
  @UseGuards(JwtAuthGuard, RefreshGuard)
  findAll(@CurrentUser() user: User) {
    return this.labelService.findAll(user.id);
  }

  @Query(() => Label, { name: 'label' })
  @UseGuards(JwtAuthGuard, RefreshGuard)
  findOne(@Args('id') id: string) {
    return this.labelService.findOne(id);
  }

  @Mutation(() => Label)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  updateLabel(
    @Args('id') id: string,
    @Args('updateLabelInput') updateLabelInput: UpdateLabelInput,
  ) {
    return this.labelService.update(id, updateLabelInput);
  }

  @Mutation(() => Label)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  removeLabel(@Args('id') id: string) {
    return this.labelService.remove(id);
  }

  @ResolveField(() => [Todo])
  todos(@Parent() label: Label) {
    return this.todoService.findLoaded.load(label.id);
  }
}
