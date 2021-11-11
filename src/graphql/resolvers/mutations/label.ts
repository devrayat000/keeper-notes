import { MutationResolvers } from '../../generated'

export const createLabelMutation: MutationResolvers['createLabel'] = async (
  _parent,
  { name },
  { app },
  _info
) => {
  const newLabel = await app
    .knex('label')
    .insert({ name })
    .onConflict('name')
    .ignore()
    .returning('*')

  return newLabel[0]
}

export const updateLabelMutation: MutationResolvers['updateLabel'] = async (
  _parent,
  { id, input },
  { app },
  _info
) => {
  const updatedLabel = await app
    .knex('label')
    .where({ _id: id })
    .update({ name: input })
    .returning('*')

  return updatedLabel[0]
}

export const deleteLabelMutation: MutationResolvers['deleteLabel'] = async (
  _parent,
  { id },
  { app },
  _info
) => {
  const updatedLabel = await app
    .knex('label')
    .where({ _id: id })
    .delete()
    .returning('*')

  return updatedLabel[0]
}
