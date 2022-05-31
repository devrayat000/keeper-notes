import { CreateTodoInput } from './create-todo.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {}
