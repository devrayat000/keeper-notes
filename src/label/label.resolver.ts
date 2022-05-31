import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LabelService } from './label.service';
import { Label } from './entities/label.entity';
import { CreateLabelInput } from './dto/create-label.input';
import { UpdateLabelInput } from './dto/update-label.input';

@Resolver(() => Label)
export class LabelResolver {
  constructor(private readonly labelService: LabelService) {}

  @Mutation(() => Label)
  createLabel(
    @Args('userId') userId: string,
    @Args('createLabelInput') createLabelInput: CreateLabelInput,
  ) {
    return this.labelService.create(userId, createLabelInput);
  }

  @Query(() => [Label], { name: 'labels' })
  findAll(@Args('userId') userId: string) {
    return this.labelService.findAll(userId);
  }

  @Query(() => Label, { name: 'label' })
  findOne(@Args('id') id: string) {
    return this.labelService.findOne(id);
  }

  @Mutation(() => Label)
  updateLabel(
    @Args('id') id: string,
    @Args('updateLabelInput') updateLabelInput: UpdateLabelInput,
  ) {
    return this.labelService.update(id, updateLabelInput);
  }

  @Mutation(() => Label)
  removeLabel(@Args('id') id: string) {
    return this.labelService.remove(id);
  }
}
