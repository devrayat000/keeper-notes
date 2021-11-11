import { MutationResolvers, Note } from '../../generated'

export * from './label'

export * from './todo'

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

export const updateNotesMutation: MutationResolvers['updateNotes'] = async (
  _parent,
  { inputs },
  { app },
  _info
) => {
  const trx = await app.knex.transaction()

  const updatedNotes: Note[] = []

  for await (const input of inputs) {
    const updatedNote = await trx('note')
      .where({ _id: input._id })
      .update({
        text: input.text,
        isCompleted: input.isCompleted,
      })
      .returning('*')

    updatedNotes.push(updatedNote[0])
  }

  await trx.commit()

  return updatedNotes
}
