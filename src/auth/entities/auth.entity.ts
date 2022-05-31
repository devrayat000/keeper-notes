import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Auth extends User {
  @Field(() => String)
  access_token: string;
}
