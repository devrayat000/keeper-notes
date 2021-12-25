import DataLoader from 'dataloader'
import { Knex, knex } from 'knex'
import { SQLDataSource } from 'datasource-sql'
import knexTinyLogger from 'knex-tiny-logger'
import { GraphQLResolveInfo } from 'graphql'
import graphqlFields from 'graphql-fields'

import type {
  Label,
  MutationAddLabelToTodoArgs,
  MutationCopyTodoArgs,
  MutationCreateLabelArgs,
  MutationCreateTodoArgs,
  MutationDeleteLabelArgs,
  MutationDeleteTodoArgs,
  MutationUpdateLabelArgs,
  MutationUpdateNotesArgs,
  MutationUpdateTodoArgs,
  Note,
  Todo,
} from './generated'
import { ApolloContext, database } from '../utils'
import { dbConfig } from '../utils/knex'

export class KeeperDataSource<
  TContext = ApolloContext
> extends SQLDataSource<TContext> {
  protected db: Knex
  protected knex: Knex

  constructor(config: Knex.Config, knex?: Knex)
  constructor(config: Knex.Config, _knex: Knex) {
    // _knex
    super(config)

    if (_knex) this.db = _knex
    else this.db = knexTinyLogger(knex(config!))

    this.knex = this.db
  }

  private readonly todoNotesLoader = new DataLoader<LoaderParam, Note[]>(
    async opts => {
      const ids = opts.map(opt => opt.id)
      const result = await this.knex
        .select()
        .from('note')
        .whereIn('todo_id', ids)

      return ids.map(id => {
        return result.filter(r => r.todo_id === id)
      })
    }
  )

  private readonly todoLabelsLoader = new DataLoader<LoaderParam, Label[]>(
    async opts => {
      const ids = opts.map(opt => opt.id)
      const result = await this.knex('label')
        .join('junction', 'junction.label_id', '=', 'label._id')
        .select()
        .whereIn('todo_id', ids)

      return ids.map(id => {
        return result.filter(r => r.todo_id === id)
      })
    }
  )

  private readonly userTodoLoader = new DataLoader<string, Todo[]>(
    async ids => {
      const result = await this.knex<Todo>('todo').whereIn('user_id', ids)

      return [result]
    }
  )

  private readonly userLabelLoader = new DataLoader<string, Label[]>(
    async ids => {
      const result = await this.knex<Label>('label').whereIn('user_id', ids)

      return [result]
    }
  )

  // Loaders
  getNotesForTodo({ id, user_id }: LoaderParam) {
    return this.todoNotesLoader.load({ id, user_id })
  }

  getLabelsForTodo({ id, user_id }: LoaderParam) {
    return this.todoLabelsLoader.load({ id, user_id })
  }

  getTodosForUser(id: string) {
    return this.userTodoLoader.load(id)
  }

  getLabelsForUser(id: string) {
    return this.userLabelLoader.load(id)
  }

  // Query
  async getLabels({ limit, userId }: ResolverParam): Promise<Label[]> {
    let result = this.knex
      .select()
      .from('label')
      .where({ user_id: userId })
      .orderBy('_id')

    if (!!limit) {
      result = result.limit(limit)
    }

    return (await result) as any
  }

  async getTodos({ limit, userId, info }: ResolverParam): Promise<Todo[]> {
    let fields = new Set<keyof Todo>(
      Object.keys(graphqlFields(info)) as (keyof Todo)[]
    )
    //   let fields = Object.keys(graphqlFields(info)) as (keyof Todo)[];

    fields.add('_id')

    if (fields.has('notes')) {
      fields.delete('notes')
    }
    if (fields.has('labels')) {
      fields.delete('labels')
    }
    console.log(fields)

    let result = this.knex
      .select(...fields)
      .from('todo')
      .where({ user_id: userId })
      .orderBy('_id')

    if (!!limit) {
      result = result.limit(limit)
    }
    let a = await result

    return a as Todo[]
  }

  // Mutation
  async createTodo({
    info,
    userId,
    input,
  }: MutationParam<MutationCreateTodoArgs>): Promise<Todo> {
    const { notes, ...todoInputs } = input

    const trx = await this.knex.transaction()

    const newTodo = await trx('todo')
      .insert({ ...todoInputs, user_id: userId })
      .returning('*')
    const todo = { ...newTodo[0], notes: [] as Note[] }

    if (!!notes) {
      todo.notes = (await trx('note')
        .insert(notes.map(text => ({ text, todo_id: newTodo[0]._id })))
        .returning('*')) as any
    }

    await trx.commit()

    return todo as any
  }

  async updateTodo({
    input,
    userId,
    id,
  }: MutationParam<MutationUpdateTodoArgs>): Promise<Todo> {
    const { notes, ...todoInput } = input

    const trx = await this.knex.transaction()

    const updatedTodo = await trx('todo')
      .where({ _id: id, user_id: userId })
      .update({ ...todoInput })
      .returning('*')
      .limit(1)

    if (!!notes) {
      for await (const note of notes) {
        await trx('note')
          .where({ todo_id: id })
          .andWhere({ _id: note._id })
          .update({ ...note })
          .onConflict('text')
          .ignore()
      }
    }

    await trx.commit()

    return updatedTodo[0] as any
  }

  async deleteTodo({
    id,
    userId,
  }: MutationParam<MutationDeleteTodoArgs>): Promise<Todo> {
    const deletedTodo = await this.knex('todo')
      .delete()
      .where({ _id: id, user_id: userId })
      .returning('*')

    return deletedTodo[0] as any
  }

  async copyTodo({
    id,
    userId,
  }: MutationParam<MutationCopyTodoArgs>): Promise<Todo> {
    const copiedTodo = await this.knex.raw(
      /*sql*/ `
            INSERT INTO todo (title, color, isChecked)
            SELECT title, color, isChecked FROM todo
              WHERE _id = $1 AND user_id = $2
          `,
      [id, userId]
    )

    return copiedTodo[0]
  }

  async createLabel({
    name,
    userId,
  }: MutationParam<MutationCreateLabelArgs>): Promise<Label> {
    const newLabel = await this.knex('label')
      .insert({ name, user_id: userId })
      .onConflict('name')
      .ignore()
      .returning('*')

    return newLabel[0] as any
  }

  async updateLabel({
    id,
    userId,
    input,
  }: MutationParam<MutationUpdateLabelArgs>): Promise<Label> {
    const updatedLabel = await this.knex('label')
      .where({ _id: id, user_id: userId })
      .update({ name: input })
      .returning('*')

    return updatedLabel[0] as any
  }

  async deleteLabel({
    id,
    userId,
  }: MutationParam<MutationDeleteLabelArgs>): Promise<Label> {
    const updatedLabel = await this.knex('label')
      .where({ _id: id, user_id: userId })
      .delete()
      .returning('*')

    return updatedLabel[0] as any
  }

  async addLabelToTodo({
    labelIds,
    todoId,
  }: MutationParam<MutationAddLabelToTodoArgs>): Promise<Label[]> {
    const result = await this.knex('junction')
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

  async updateNotes({
    inputs,
  }: MutationParam<Omit<MutationUpdateNotesArgs, 'user_id'>>): Promise<Note[]> {
    const trx = await this.knex.transaction()

    const updatedNotes: Note[] = []

    for await (const input of inputs) {
      const updatedNote = await trx('note')
        .where({ _id: input._id })
        .update({
          text: input.text,
          isCompleted: input.isCompleted,
        })
        .returning('*')

      updatedNotes.push(updatedNote[0] as any)
    }

    await trx.commit()

    return updatedNotes
  }
}

type MutationParam<T extends object = {}> = BaseParam & T

interface BaseParam {
  info: GraphQLResolveInfo
  userId: string
}

interface LoaderParam {
  id: string
  user_id: string
}

interface ResolverParam extends BaseParam {
  limit?: number | null
}

export const dataSource = {
  keeper: new KeeperDataSource<ApolloContext>(dbConfig, database),
}
