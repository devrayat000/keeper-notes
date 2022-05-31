import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { LabelService } from './label.service';
import { Label } from './entities/label.entity';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Label)
export class LabelResolver {
  constructor(private readonly labelService: LabelService) {}

  @Mutation(() => Label)
  @UseGuards(JwtAuthGuard)
  createLabel(
    @CurrentUser() user: User,
    @Args('createLabelInput') createLabelInput: CreateLabelInput,
  ) {
    return this.labelService.create(user.id, createLabelInput);
  }

  @Query(() => [Label], { name: 'labels' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.labelService.findAll(user.id);
  }

  @Query(() => Label, { name: 'label' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.labelService.findOne(id);
  }

  @Mutation(() => Label)
  @UseGuards(JwtAuthGuard)
  updateLabel(
    @Args('id') id: string,
    @Args('updateLabelInput') updateLabelInput: UpdateLabelInput,
  ) {
    return this.labelService.update(id, updateLabelInput);
  }

  @Mutation(() => Label)
  @UseGuards(JwtAuthGuard)
  removeLabel(@Args('id') id: string) {
    return this.labelService.remove(id);
  }
}
