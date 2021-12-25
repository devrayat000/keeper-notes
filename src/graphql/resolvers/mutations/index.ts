import type { ApolloContext } from '../../../utils'
import type { MutationResolvers, Note } from '../../generated'

export * from './label'

export * from './todo'

type IMutationResolvers = MutationResolvers<ApolloContext>

export const addLabelToTodoMutation: IMutationResolvers['addLabelToTodo'] =
  async (_parent, { labelIds, todoId }, { dataSources, user }, info) => {
    // const result = await app
    //   .knex("junction")
    //   .insert(
    //     labelIds.map((i) => ({
    //       label_id: i,
    //       todo_id: todoId,
    //     }))
    //   )
    //   .join("label", "label._id", "=", "junction.label_id")
    //   .returning("*");

    // return result;
    return dataSources.keeper.addLabelToTodo({
      labelIds,
      todoId,
      info,
      userId: user._id,
    })
  }

export const updateNotesMutation: IMutationResolvers['updateNotes'] = async (
  _parent,
  { inputs },
  { dataSources, user },
  info
) => {
  // const trx = await app.knex.transaction();

  // const updatedNotes: Note[] = [];

  // for await (const input of inputs) {
  //   const updatedNote = await trx("note")
  //     .where({ _id: input._id })
  //     .update({
  //       text: input.text,
  //       isCompleted: input.isCompleted,
  //     })
  //     .returning("*");

  //   updatedNotes.push(updatedNote[0]);
  // }

  // await trx.commit();

  // return updatedNotes;

  return dataSources.keeper.updateNotes({ inputs, info, userId: user._id })
}
