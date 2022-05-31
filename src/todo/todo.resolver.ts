import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('userId') userId: string,
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ) {
    return this.todoService.create(userId, createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args('userId') userId: string) {
    return this.todoService.findAll(userId);
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id') id: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => Todo)
  removeTodo(@Args('id') id: string) {
    return this.todoService.remove(id);
  }

  @Mutation(() => Todo)
  copyTodo(@Args('id') id: string) {
    return this.todoService.copy(id);
  }
}
