import type { QueryResolvers } from '../generated'

export const labelQuery: QueryResolvers['labels'] = async (
  _parent,
  _args,
  { app },
  _info
) => {
  const result = await app.knex.select().from('label')

  return result
}

export const todoQuery: QueryResolvers['todos'] = async (
  _parent,
  _args,
  { app },
  _info
) => {
  const result = await app.knex.select().from('todo').orderBy('_id')

  return result
}
