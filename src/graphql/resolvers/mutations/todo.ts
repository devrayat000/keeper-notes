import type { ApolloContext } from '../../../utils'
import type { MutationResolvers, Note, Todo } from '../../generated'

type IMutationResolvers = MutationResolvers<ApolloContext>

export const createTodoMutation: IMutationResolvers['createTodo'] = async (
  _parent,
  { input },
  { dataSources, user },
  info
) => {
  // const { notes, ...todoInputs } = input;

  // const trx = await knex.transaction();

  // const newTodo = await trx("todo").insert(todoInputs).returning("*");
  // const todo = { ...newTodo[0], notes: [] as Note[] };

  // if (!!notes) {
  //   todo.notes = await trx("note")
  //     .insert(notes.map((text) => ({ text, todo_id: newTodo[0]._id })))
  //     .returning("*");
  // }

  // await trx.commit();

  // return todo;
  return dataSources.keeper.createTodo({ input, info, userId: user._id })
}

export const updateTodoMutation: IMutationResolvers['updateTodo'] = async (
  _parent,
  { id, input },
  { dataSources, user },
  info
) => {
  // const { notes, ...todoInput } = input!;

  // const trx = await knex.transaction();

  // const updatedTodo = await trx("todo")
  //   .where({ _id: id })
  //   .update({ ...todoInput })
  //   .returning("*")
  //   .limit(1);

  // if (!!notes) {
  //   for await (const note of notes) {
  //     await trx("note")
  //       .where({ todo_id: id })
  //       .andWhere({ _id: note._id })
  //       .update({ ...note })
  //       .onConflict("text")
  //       .ignore();
  //   }
  // }

  // await trx.commit();

  // return updatedTodo[0];
  return dataSources.keeper.updateTodo({ id, input, info, userId: user._id })
}

export const deleteTodoMutation: IMutationResolvers['deleteTodo'] = async (
  _parent,
  { id },
  { dataSources, user },
  info
) => {
  // const deletedTodo = await knex("todo")
  //   .delete()
  //   .where({ _id: id })
  //   .returning("*");

  // return deletedTodo[0];
  return dataSources.keeper.deleteTodo({ id, info, userId: user._id })
}

export const copyTodoMutation: IMutationResolvers['copyTodo'] = async (
  _parent,
  { id },
  { dataSources, user },
  info
) => {
  // const copiedTodo = await knex.raw(
  //   /*sql*/ `
  //     INSERT INTO todo (title, color, isChecked)
  //     SELECT title, color, isChecked FROM todo
  //       WHERE _id = $1
  //   `,
  //   id
  // );

  // return copiedTodo[0];
  return dataSources.keeper.copyTodo({ id, info, userId: user._id })
}
