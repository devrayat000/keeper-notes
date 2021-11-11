import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import type { MercuriusContext } from 'mercurius'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) =>
  | Promise<import('mercurius-codegen').DeepPartial<TResult>>
  | import('mercurius-codegen').DeepPartial<TResult>
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Custom Date */
  Date: Date
  _FieldSet: any
}

export type UpdateNoteInput = {
  _id: Scalars['ID']
  text?: Maybe<Scalars['String']>
  isCompleted?: Maybe<Scalars['Boolean']>
}

export type CreateTodoInput = {
  title: Scalars['String']
  notes?: Maybe<Array<Scalars['String']>>
  color?: Maybe<Scalars['String']>
  isCheckBoxMode?: Maybe<Scalars['Boolean']>
}

export type UpdateTodoInput = {
  title?: Maybe<Scalars['String']>
  notes?: Maybe<Array<UpdateNoteInput>>
  color?: Maybe<Scalars['String']>
  isCheckBoxMode?: Maybe<Scalars['Boolean']>
}

export type Base = {
  _id: Scalars['ID']
  createdAt: Scalars['Date']
}

/** Label for todos */
export type Label = Base & {
  __typename?: 'Label'
  _id: Scalars['ID']
  name: Scalars['String']
  createdAt: Scalars['Date']
}

/** Notes for todos */
export type Note = Base & {
  __typename?: 'Note'
  _id: Scalars['ID']
  text: Scalars['String']
  isCompleted: Scalars['Boolean']
  createdAt: Scalars['Date']
}

/** Todos */
export type Todo = Base & {
  __typename?: 'Todo'
  _id: Scalars['ID']
  title: Scalars['String']
  notes: Array<Note>
  labels: Array<Label>
  color: Scalars['String']
  isCheckBoxMode: Scalars['Boolean']
  createdAt: Scalars['Date']
}

export type User = Base & {
  __typename?: 'User'
  _id: Scalars['ID']
  email: Scalars['String']
  name: Scalars['String']
  todos: Array<Todo>
  labels: Array<Label>
  listMode: Scalars['Boolean']
  darkMode: Scalars['Boolean']
  createdAt: Scalars['Date']
}

export type Mutation = {
  __typename?: 'Mutation'
  createTodo: Todo
  updateTodo: Todo
  deleteTodo: Todo
  copyTodo: Todo
  updateNotes: Array<Note>
  createLabel: Label
  updateLabel: Label
  deleteLabel: Label
  addLabelToTodo: Array<Label>
}

export type MutationcreateTodoArgs = {
  input: CreateTodoInput
}

export type MutationupdateTodoArgs = {
  id: Scalars['ID']
  input: UpdateTodoInput
}

export type MutationdeleteTodoArgs = {
  id: Scalars['ID']
}

export type MutationcopyTodoArgs = {
  id: Scalars['ID']
}

export type MutationupdateNotesArgs = {
  ids: Array<Scalars['ID']>
}

export type MutationcreateLabelArgs = {
  name: Scalars['String']
}

export type MutationupdateLabelArgs = {
  id: Scalars['ID']
  input: Scalars['String']
}

export type MutationdeleteLabelArgs = {
  id: Scalars['ID']
}

export type MutationaddLabelToTodoArgs = {
  todoId: Scalars['ID']
  labelIds: Array<Scalars['ID']>
}

export type Query = {
  __typename?: 'Query'
  todos: Array<Todo>
  labels: Array<Label>
  user?: Maybe<User>
}

export type ResolverTypeWrapper<T> =
  | Promise<T>
  | T
  | (() => Promise<T>)
  | (() => T)

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  UpdateNoteInput: UpdateNoteInput
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CreateTodoInput: CreateTodoInput
  UpdateTodoInput: UpdateTodoInput
  Base:
    | ResolversTypes['Label']
    | ResolversTypes['Note']
    | ResolversTypes['Todo']
    | ResolversTypes['User']
  Date: ResolverTypeWrapper<Scalars['Date']>
  Label: ResolverTypeWrapper<Label>
  Note: ResolverTypeWrapper<Note>
  Todo: ResolverTypeWrapper<Todo>
  User: ResolverTypeWrapper<User>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  UpdateNoteInput: UpdateNoteInput
  ID: Scalars['ID']
  String: Scalars['String']
  Boolean: Scalars['Boolean']
  CreateTodoInput: CreateTodoInput
  UpdateTodoInput: UpdateTodoInput
  Base:
    | ResolversParentTypes['Label']
    | ResolversParentTypes['Note']
    | ResolversParentTypes['Todo']
    | ResolversParentTypes['User']
  Date: Scalars['Date']
  Label: Label
  Note: Note
  Todo: Todo
  User: User
  Mutation: {}
  Query: {}
}

export type BaseResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Base'] = ResolversParentTypes['Base']
> = {
  resolveType: TypeResolveFn<
    'Label' | 'Note' | 'Todo' | 'User',
    ParentType,
    ContextType
  >
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type LabelResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type NoteResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TodoResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isCheckBoxMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  listMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  darkMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateTodoArgs, 'input'>
  >
  updateTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationupdateTodoArgs, 'id' | 'input'>
  >
  deleteTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteTodoArgs, 'id'>
  >
  copyTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationcopyTodoArgs, 'id'>
  >
  updateNotes?: Resolver<
    Array<ResolversTypes['Note']>,
    ParentType,
    ContextType,
    RequireFields<MutationupdateNotesArgs, 'ids'>
  >
  createLabel?: Resolver<
    ResolversTypes['Label'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateLabelArgs, 'name'>
  >
  updateLabel?: Resolver<
    ResolversTypes['Label'],
    ParentType,
    ContextType,
    RequireFields<MutationupdateLabelArgs, 'id' | 'input'>
  >
  deleteLabel?: Resolver<
    ResolversTypes['Label'],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteLabelArgs, 'id'>
  >
  addLabelToTodo?: Resolver<
    Array<ResolversTypes['Label']>,
    ParentType,
    ContextType,
    RequireFields<MutationaddLabelToTodoArgs, 'todoId' | 'labelIds'>
  >
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
}

export type Resolvers<ContextType = MercuriusContext> = {
  Base?: BaseResolvers<ContextType>
  Date?: GraphQLScalarType
  Label?: LabelResolvers<ContextType>
  Note?: NoteResolvers<ContextType>
  Todo?: TodoResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
}

type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj
    params: TParams
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply
  }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>
type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>
      opts?: {
        cache?: boolean
      }
    }
export interface Loaders<
  TContext = import('mercurius').MercuriusContext & {
    reply: import('fastify').FastifyReply
  }
> {
  Label?: {
    _id?: LoaderResolver<Scalars['ID'], Label, {}, TContext>
    name?: LoaderResolver<Scalars['String'], Label, {}, TContext>
    createdAt?: LoaderResolver<Scalars['Date'], Label, {}, TContext>
  }

  Note?: {
    _id?: LoaderResolver<Scalars['ID'], Note, {}, TContext>
    text?: LoaderResolver<Scalars['String'], Note, {}, TContext>
    isCompleted?: LoaderResolver<Scalars['Boolean'], Note, {}, TContext>
    createdAt?: LoaderResolver<Scalars['Date'], Note, {}, TContext>
  }

  Todo?: {
    _id?: LoaderResolver<Scalars['ID'], Todo, {}, TContext>
    title?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
    notes?: LoaderResolver<Array<Note>, Todo, {}, TContext>
    labels?: LoaderResolver<Array<Label>, Todo, {}, TContext>
    color?: LoaderResolver<Scalars['String'], Todo, {}, TContext>
    isCheckBoxMode?: LoaderResolver<Scalars['Boolean'], Todo, {}, TContext>
    createdAt?: LoaderResolver<Scalars['Date'], Todo, {}, TContext>
  }

  User?: {
    _id?: LoaderResolver<Scalars['ID'], User, {}, TContext>
    email?: LoaderResolver<Scalars['String'], User, {}, TContext>
    name?: LoaderResolver<Scalars['String'], User, {}, TContext>
    todos?: LoaderResolver<Array<Todo>, User, {}, TContext>
    labels?: LoaderResolver<Array<Label>, User, {}, TContext>
    listMode?: LoaderResolver<Scalars['Boolean'], User, {}, TContext>
    darkMode?: LoaderResolver<Scalars['Boolean'], User, {}, TContext>
    createdAt?: LoaderResolver<Scalars['Date'], User, {}, TContext>
  }
}
declare module 'mercurius' {
  interface IResolvers
    extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
