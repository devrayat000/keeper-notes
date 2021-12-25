import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
  /** Custom Date */
  Date: any;
};

export type Base = {
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
};

export type CreateTodoInput = {
  color?: InputMaybe<Scalars['String']>;
  isCheckBoxMode?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

/** Label for todos */
export type Label = Base & {
  __typename?: 'Label';
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLabelToTodo: Array<Label>;
  copyTodo: Todo;
  createLabel: Label;
  createTodo: Todo;
  deleteLabel: Label;
  deleteTodo: Todo;
  updateLabel: Label;
  updateNotes: Array<Note>;
  updateTodo: Todo;
};


export type MutationAddLabelToTodoArgs = {
  labelIds: Array<Scalars['ID']>;
  todoId: Scalars['ID'];
};


export type MutationCopyTodoArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLabelArgs = {
  name: Scalars['String'];
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteLabelArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateLabelArgs = {
  id: Scalars['ID'];
  input: Scalars['String'];
};


export type MutationUpdateNotesArgs = {
  inputs: Array<UpdateNoteInput>;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  input: UpdateTodoInput;
};

/** Notes for todos */
export type Note = Base & {
  __typename?: 'Note';
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
  isCompleted: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  labels: Array<Label>;
  todos: Array<Todo>;
  user?: Maybe<User>;
};


export type QueryLabelsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryTodosArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

/** Todos */
export type Todo = Base & {
  __typename?: 'Todo';
  _id: Scalars['ID'];
  color: Scalars['String'];
  createdAt: Scalars['Date'];
  isCheckBoxMode: Scalars['Boolean'];
  labels: Array<Label>;
  notes: Array<Note>;
  title: Scalars['String'];
};

export type UpdateNoteInput = {
  _id: Scalars['ID'];
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateTodoInput = {
  color?: InputMaybe<Scalars['String']>;
  isCheckBoxMode?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Array<UpdateNoteInput>>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = Base & {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['Date'];
  darkMode: Scalars['Boolean'];
  email: Scalars['String'];
  labels: Array<Label>;
  listMode: Scalars['Boolean'];
  name: Scalars['String'];
  todos: Array<Todo>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Base: ResolversTypes['Label'] | ResolversTypes['Note'] | ResolversTypes['Todo'] | ResolversTypes['User'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  CreateTodoInput: CreateTodoInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Label: ResolverTypeWrapper<Label>;
  Mutation: ResolverTypeWrapper<{}>;
  Note: ResolverTypeWrapper<Note>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Todo: ResolverTypeWrapper<Todo>;
  UpdateNoteInput: UpdateNoteInput;
  UpdateTodoInput: UpdateTodoInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Base: ResolversParentTypes['Label'] | ResolversParentTypes['Note'] | ResolversParentTypes['Todo'] | ResolversParentTypes['User'];
  ID: Scalars['ID'];
  CreateTodoInput: CreateTodoInput;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  Label: Label;
  Mutation: {};
  Note: Note;
  Query: {};
  Int: Scalars['Int'];
  Todo: Todo;
  UpdateNoteInput: UpdateNoteInput;
  UpdateTodoInput: UpdateTodoInput;
  User: User;
};

export type BaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Base'] = ResolversParentTypes['Base']> = {
  __resolveType: TypeResolveFn<'Label' | 'Note' | 'Todo' | 'User', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LabelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addLabelToTodo?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<MutationAddLabelToTodoArgs, 'labelIds' | 'todoId'>>;
  copyTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationCopyTodoArgs, 'id'>>;
  createLabel?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<MutationCreateLabelArgs, 'name'>>;
  createTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'input'>>;
  deleteLabel?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<MutationDeleteLabelArgs, 'id'>>;
  deleteTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, 'id'>>;
  updateLabel?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<MutationUpdateLabelArgs, 'id' | 'input'>>;
  updateNotes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType, RequireFields<MutationUpdateNotesArgs, 'inputs'>>;
  updateTodo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'id' | 'input'>>;
};

export type NoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<QueryLabelsArgs, never>>;
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryTodosArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  isCheckBoxMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  darkMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType>;
  listMode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Base?: BaseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Label?: LabelResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Note?: NoteResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

