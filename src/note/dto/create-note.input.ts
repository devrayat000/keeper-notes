import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field(() => String)
  text: string;

  @Field(() => Boolean, { defaultValue: false })
  isCompleted: boolean;
}
