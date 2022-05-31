import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { DisplayMode } from '../entities/display-mode.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => DisplayMode)
  displayMode: DisplayMode;

  @Field(() => Boolean)
  darkMode: boolean;
}
