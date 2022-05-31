import { ObjectType, Field } from '@nestjs/graphql';
import { TodoMode } from './todo-mode.enum';

@ObjectType()
export class Todo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { defaultValue: '#fafafa' })
  color: string;

  @Field(() => TodoMode)
  mode: TodoMode;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
