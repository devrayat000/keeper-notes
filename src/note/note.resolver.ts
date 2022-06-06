import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NoteService } from './note.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { RefreshGuard } from 'src/auth/refresh.guard';

@Resolver(() => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Mutation(() => Note)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  createNote(
    @Args('todoId', { type: () => ID }) todoId: string,
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
  ) {
    return this.noteService.create(todoId, createNoteInput);
  }

  @Query(() => [Note], { name: 'notes' })
  @UseGuards(JwtAuthGuard, RefreshGuard)
  findAll(@Args('todoId', { type: () => ID }) todoId: string) {
    return this.noteService.findAll(todoId);
  }

  @Query(() => Note, { name: 'note' })
  @UseGuards(JwtAuthGuard, RefreshGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.noteService.findOne(id);
  }

  @Mutation(() => Note)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  updateNote(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
  ) {
    return this.noteService.update(id, updateNoteInput);
  }

  @Mutation(() => Note)
  @UseGuards(JwtAuthGuard, RefreshGuard)
  removeNote(@Args('id', { type: () => ID }) id: string) {
    return this.noteService.remove(id);
  }
}
