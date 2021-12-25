// import type { PromiseType } from './types'
import type { Knex } from 'knex'
import {
  CreateTodoInput,
  Label as ILabel,
  Note as INote,
  Todo as ITodo,
  UpdateNoteInput,
  UpdateTodoInput,
  User,
} from '../graphql/generated'

declare module 'knex/types/tables' {
  interface JunctionTable {
    _id: string
    label_id: string
    todo_id: string
  }

  interface LabelTable extends ILabel {
    user_id: string
  }

  interface NoteTable extends INote {
    _id: string
    todo_id: string
  }

  type TodoTable = Omit<ITodo, 'notes' | 'label'> & {
    user_id: string
  }
  type ICreateTodoInput = Omit<CreateTodoInput, 'notes' | 'labels'> & {
    user_id: string
  }
  type IUpdateTodoInput = Omit<UpdateTodoInput, 'notes' | 'labels'>
  type UserTable = Omit<User, 'labels' | 'todos' | '__typename'> & {
    hash: string
    salt: string
  }

  type CreateUser = Omit<
    UserTable,
    '_id' | 'createdAt' | 'darkMode' | 'listMode'
  >
  type UpdateUser = Omit<CreateUser, 'email'>

  interface Tables {
    note: Knex.CompositeTableType<
      NoteTable,
      { text: string },
      Omit<UpdateNoteInput, '_id'>
    >
    todo: Knex.CompositeTableType<TodoTable, ICreateTodoInput, IUpdateTodoInput>
    label: Knex.CompositeTableType<
      LabelTable,
      { name: string; user_id: string },
      { name: string }
    >
    junction: Knex.CompositeTableType<
      JunctionTable,
      { label_id: string; todo_id: string }
    >
    user: Knex.CompositeTableType<UserTable, CreateUser, UpdateUser>
  }
}

declare module 'knex/types/result' {
  interface Registry {
    note: INote
    todo: ITodo
    label: ILabel
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV?: 'production' | 'development' | 'test'
      readonly PORT?: number
      readonly SESSION_SECRET?: string
      readonly COOKIE_SECRET?: string
    }
  }
}

export {}
