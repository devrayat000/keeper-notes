import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  hash: string;

  @Field(() => String)
  salt: string;
}
