import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => Boolean)
  isCompleted: boolean;
}
