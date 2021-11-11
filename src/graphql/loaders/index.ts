import type { MercuriusLoaders } from 'mercurius'
import type { Label as ILabel, Note as INote } from '../generated'

// import Label from '../../models/label'

const loaders: MercuriusLoaders = {
  Todo: {
    async notes(queries, { app }) {
      const result = await app.knex
        .select()
        .from('note')
        .whereIn(
          'todo_id',
          queries.map(q => q.obj._id)
        )

      return queries.map(q => {
        return result.filter(r => r.todo_id === q.obj._id)
      })
    },
    async labels(queries, { app }) {
      const result = await app
        .knex('label')
        .join('junction', 'junction.label_id', '=', 'label._id')
        .select()
        .whereIn(
          'todo_id',
          queries.map(q => q.obj._id)
        )

      return queries.map(q => {
        return result.filter(r => (r.todo_id = q.obj._id))
      })
    },
  },
}

export default loaders
