import type { MutationResolvers } from '../generated'

export const createLabelMutation: MutationResolvers['createLabel'] = async (
  _parent,
  { name },
  { app },
  _info
) => {
  const newLabel = await app.knex('label').insert({ name }).returning('*')

  return newLabel[0]
}

export const createTodoMutation: MutationResolvers['createTodo'] = async (
  _parent,
  { input },
  { app },
  _info
) => {
  const { notes, ...todoInputs } = input

  const trx = await app.knex.transaction()

  const newTodo = await trx('todo').insert(todoInputs).returning('*')

  if (!!notes) {
    const newNotes = await trx('note')
      .insert(notes.map(text => ({ text, todo_id: newTodo[0]._id })))
      .returning('*')
  }

  await trx.commit()

  return { ...newTodo[0] }
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

export const addLabelToTodoMutation: MutationResolvers['addLabelToTodo'] =
  async (_parent, { labelIds, todoId }, { app }, _info) => {
    const result = await app
      .knex('junction')
      .insert(
        labelIds.map(i => ({
          label_id: i,
          todo_id: todoId,
        }))
      )
      .join('label', 'label._id', '=', 'junction.label_id')
      .returning('*')

    return result
  }
