import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';

@ObjectType()
export class Label {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [Todo])
  todos: Todo[];

  @Field(() => Date)
  createdAt: Date;
}
