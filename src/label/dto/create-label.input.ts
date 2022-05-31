import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLabelInput {
  @Field(() => String)
  name: string;
}
