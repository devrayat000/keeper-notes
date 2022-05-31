import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';

import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Note } from 'src/note/entities/note.entity';
import { NoteService } from 'src/note/note.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodoService,
    private readonly noteService: NoteService,
  ) {}

  @Mutation(() => Todo)
  @UseGuards(JwtAuthGuard)
  createTodo(
    @CurrentUser() user: User,
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ) {
    return this.todoService.create(user.id, createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.todoService.findAll(user.id);
  }

  @Query(() => Todo, { name: 'todo' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  @UseGuards(JwtAuthGuard)
  updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => Todo)
  @UseGuards(JwtAuthGuard)
  removeTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.remove(id);
  }

  @Mutation(() => Todo)
  @UseGuards(JwtAuthGuard)
  copyTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.copy(id);
  }

  @ResolveField(() => [Note])
  notes(@Parent() todo: Todo) {
    console.log(todo.id);

    return this.noteService.findLoaded.load(todo.id);
  }
}
