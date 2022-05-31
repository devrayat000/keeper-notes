import { ObjectType, Field } from '@nestjs/graphql';
import { Label } from 'src/label/entities/label.entity';
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

  @Field(() => [Label])
  labels: Label[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
