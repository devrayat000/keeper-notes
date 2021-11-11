import { MutationResolvers, Note, Todo } from '../../generated'

export const createTodoMutation: MutationResolvers['createTodo'] = async (
  _parent,
  { input },
  { app },
  _info
) => {
  const { notes, ...todoInputs } = input

  const trx = await app.knex.transaction()

  const newTodo = await trx('todo').insert(todoInputs).returning('*')
  const todo = { ...newTodo[0], notes: [] as Note[] }

  if (!!notes) {
    todo.notes = await trx('note')
      .insert(notes.map(text => ({ text, todo_id: newTodo[0]._id })))
      .returning('*')
  }

  await trx.commit()

  return todo
}

export const updateTodoMutation: MutationResolvers['updateTodo'] = async (
  _parent,
  { id, input },
  { app },
  _info
) => {
  const { notes, ...todoInput } = input!

  const trx = await app.knex.transaction()

  const updatedTodo = await trx('todo')
    .where({ _id: id })
    .update({ ...todoInput })
    .returning('*')
    .limit(1)

  if (!!notes) {
    for await (const note of notes) {
      await trx('note')
        .where({ todo_id: id })
        .andWhere({ _id: note._id })
        .update({ ...note })
        .onConflict('text')
        .ignore()
    }
  }

  await trx.commit()

  return updatedTodo[0]
}

export const deleteTodoMutation: MutationResolvers['deleteTodo'] = async (
  _parent,
  { id },
  { app },
  _info
) => {
  const deletedTodo = await app
    .knex('todo')
    .delete()
    .where({ _id: id })
    .returning('*')

  return deletedTodo[0]
}

export const copyTodoMutation: MutationResolvers['copyTodo'] = async (
  _parent,
  { id },
  { app },
  _info
) => {
  const copiedTodo = await app.knex.raw(
    /*sql*/ `
      INSERT INTO todo (title, color, isChecked)
      SELECT title, color, isChecked FROM todo
        WHERE _id = $1
    `,
    id
  )

  return copiedTodo[0]
}
