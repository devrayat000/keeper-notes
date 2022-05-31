import { Field, InputType } from '@nestjs/graphql';
import { TodoMode } from '../entities/todo-mode.enum';
// import { UpdateNoteInput } from './update-note.input';

@InputType()
export class UpdateTodoInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => TodoMode, { nullable: true })
  mode?: TodoMode;
}
