import type { ApolloContext } from '../../../utils'
import type { MutationResolvers } from '../../generated'

type IMutationResolvers = MutationResolvers<ApolloContext>

export const createLabelMutation: IMutationResolvers['createLabel'] = async (
  _parent,
  { name },
  { dataSources, user },
  info
) => {
  // const newLabel = await app
  //   .knex('label')
  //   .insert({ name })
  //   .onConflict('name')
  //   .ignore()
  //   .returning('*')

  // return newLabel[0]
  return dataSources.keeper.createLabel({ name, info, userId: user._id })
}

export const updateLabelMutation: IMutationResolvers['updateLabel'] = async (
  _parent,
  { id, input },
  { dataSources, user },
  info
) => {
  // const updatedLabel = await app
  //   .knex("label")
  //   .where({ _id: id })
  //   .update({ name: input })
  //   .returning("*");

  // return updatedLabel[0];
  return dataSources.keeper.updateLabel({ id, input, info, userId: user._id })
}

export const deleteLabelMutation: IMutationResolvers['deleteLabel'] = async (
  _parent,
  { id },
  { dataSources, user },
  info
) => {
  // const updatedLabel = await app
  //   .knex("label")
  //   .where({ _id: id })
  //   .delete()
  //   .returning("*");

  // return updatedLabel[0];

  return dataSources.keeper.deleteLabel({ id, info, userId: user._id })
}
