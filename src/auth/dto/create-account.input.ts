import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;
}
