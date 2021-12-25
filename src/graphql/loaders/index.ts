import DataLoader from 'dataloader'
import type { NoteTable } from 'knex/types/tables'

import { database } from '../../utils'
import type { Label } from '../generated'

export const notesLoader = new DataLoader<string, NoteTable[]>(async ids => {
  const result = await database.select().from('note').whereIn('todo_id', ids)

  return ids.map(id => {
    return result.filter(r => r.todo_id === id)
  })
})

export const labelsLoader = new DataLoader<string, Label[]>(async ids => {
  const result = await database('label')
    .join('junction', 'junction.label_id', '=', 'label._id')
    .select()
    .whereIn('todo_id', ids)

  console.log(result)
  console.log(ids)

  return ids.map(id => {
    return result.filter(r => r.todo_id === id)
  })
})
