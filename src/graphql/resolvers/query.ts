import type { QueryResolvers } from '../generated'

export const labelQuery: QueryResolvers['labels'] = async (
  _parent,
  { limit },
  { app },
  _info
) => {
  let result = app.knex.select().from('label').orderBy('_id')

  if (!!limit) {
    result = result.limit(limit)
  }

  return result
}

export const todoQuery: QueryResolvers['todos'] = async (
  _parent,
  { limit },
  { app },
  _info
) => {
  let result = app.knex.select().from('todo').orderBy('_id')

  if (!!limit) {
    result = result.limit(limit)
  }

  return result
}
