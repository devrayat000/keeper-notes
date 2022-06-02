import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  createdAt: Scalars['DateTime'];
  darkMode: Scalars['Boolean'];
  displayMode: DisplayMode;
  email: Scalars['String'];
  /** Example field (placeholder) */
  id: Scalars['ID'];
  name: Scalars['String'];
  token: Token;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateLabelInput = {
  name: Scalars['String'];
};

export type CreateNoteInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  text: Scalars['String'];
};

export type CreateTodoInput = {
  color?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<TodoMode>;
  title: Scalars['String'];
};

export type CreateUserInput = {
  /** Example field (placeholder) */
  email: Scalars['String'];
  hash: Scalars['String'];
  name: Scalars['String'];
  salt: Scalars['String'];
};

export enum DisplayMode {
  Grid = 'GRID',
  List = 'LIST'
}

export type Label = {
  __typename?: 'Label';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  todos?: Maybe<Array<Todo>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  copyTodo: Todo;
  createAccount: Auth;
  createLabel: Label;
  createNote: Note;
  createTodo: Todo;
  createUser: User;
  login: Auth;
  logout: Auth;
  refresh: Token;
  removeLabel: Label;
  removeNote: Note;
  removeTodo: Todo;
  removeUser: User;
  updateLabel: Label;
  updateNote: Note;
  updateTodo: Todo;
  updateUser: User;
};


export type MutationCopyTodoArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  createAccountInput: CreateAccountInput;
};


export type MutationCreateLabelArgs = {
  createLabelInput: CreateLabelInput;
};


export type MutationCreateNoteArgs = {
  createNoteInput: CreateNoteInput;
  todoId: Scalars['ID'];
};


export type MutationCreateTodoArgs = {
  createTodoInput: CreateTodoInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveLabelArgs = {
  id: Scalars['String'];
};


export type MutationRemoveNoteArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateLabelArgs = {
  id: Scalars['String'];
  updateLabelInput: UpdateLabelInput;
};


export type MutationUpdateNoteArgs = {
  id: Scalars['ID'];
  updateNoteInput: UpdateNoteInput;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  updateTodoInput: UpdateTodoInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  updateUserInput: UpdateUserInput;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  label: Label;
  labels: Array<Label>;
  me: User;
  note: Note;
  notes: Array<Note>;
  todo: Todo;
  todos: Array<Todo>;
  user: User;
  users: Array<User>;
};


export type QueryLabelArgs = {
  id: Scalars['String'];
};


export type QueryNoteArgs = {
  id: Scalars['ID'];
};


export type QueryNotesArgs = {
  todoId: Scalars['ID'];
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  labels: Array<Label>;
  mode: TodoMode;
  notes: Array<Note>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum TodoMode {
  Checkbox = 'CHECKBOX',
  Simple = 'SIMPLE'
}

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateLabelInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateNoteInput = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateTodoInput = {
  color?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<TodoMode>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  darkMode: Scalars['Boolean'];
  displayMode: DisplayMode;
  /** Example field (placeholder) */
  email?: InputMaybe<Scalars['String']>;
  hash?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  salt?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  darkMode: Scalars['Boolean'];
  displayMode: DisplayMode;
  email: Scalars['String'];
  /** Example field (placeholder) */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Auth', id: string, createdAt: any } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', id: string, email: string, name: string, displayMode: DisplayMode, darkMode: boolean } };


export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(createAccountInput: $input) {
    id
    createdAt
  }
}
    `;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    id
    email
    name
    displayMode
    darkMode
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};