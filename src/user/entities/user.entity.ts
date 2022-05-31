import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DisplayMode } from './display-mode.enum';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => DisplayMode)
  displayMode: DisplayMode;

  @Field(() => Boolean)
  darkMode: boolean;

  @Field(() => Date)
  createdAt: Date;
}
