import { InputType, Field } from '@nestjs/graphql';
import { TodoMode } from '../entities/todo-mode.enum';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  title: string;

  @Field(() => String, { defaultValue: '#fafafa' })
  color: string;

  @Field(() => TodoMode, { defaultValue: TodoMode.SIMPLE })
  mode: TodoMode;
}
