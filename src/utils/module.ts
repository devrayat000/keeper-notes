import type { PromiseType } from './types'
import type { Knex } from 'knex'
import type {
  Note as INote,
  Todo as ITodo,
  Label as ILabel,
  CreateTodoInput,
  UpdateTodoInput,
} from '../graphql/generated'

declare module 'fastify' {
  interface FastifyInstance {
    env: {
      PUBLIC_DATABASE_CONNECTION: string
    }
    knex: Knex
  }
}

declare module 'mercurius' {
  interface MercuriusContext
    extends PromiseType<{
      authorization?: string
    }> {}
}

declare module 'knex/types/tables' {
  interface JunctionTable {
    _id: string
    label_id: string
    todo_id: string
  }

  interface NoteTable extends INote {
    _id: string
    todo_id: string
  }

  type TodoTable = Omit<ITodo, 'notes' | 'label'>
  type ICreateTodoInput = Omit<CreateTodoInput, 'notes' | 'labels'>
  type IUpdateTodoInput = Omit<UpdateTodoInput, 'notes' | 'labels'>

  interface Tables {
    note: Knex.CompositeTableType<NoteTable, { text: string }, {}>
    todo: Knex.CompositeTableType<TodoTable, ICreateTodoInput, IUpdateTodoInput>
    label: Knex.CompositeTableType<ILabel, { name: string }, { name: string }>
    junction: Knex.CompositeTableType<
      JunctionTable,
      { label_id: string; todo_id: string }
    >
  }
}

// declare module 'knex/types/result' {
//   interface Registry {
//     note: INote
//     todo: ITodo
//     label: ILabel
//   }
// }
