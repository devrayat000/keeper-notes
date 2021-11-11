import type { IResolvers } from 'mercurius'

import { labelQuery, todoQuery } from './query'
import {
  addLabelToTodoMutation,
  createLabelMutation,
  createTodoMutation,
  updateTodoMutation,
} from './mutation'
import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql'

const resolvers: IResolvers = {
  Query: {
    labels: labelQuery,
    todos: todoQuery,
  },
  Mutation: {
    createLabel: createLabelMutation,
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    addLabelToTodo: addLabelToTodoMutation,
    //   Subscription: {
    //     newNotification: {
    //       subscribe: (_root, _args, { pubsub }) => {
    //         return pubsub.subscribe(NOTIFICATION)
    //       },
    //     },
    //   },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date) {
      return value.getTime() // Convert outgoing Date to integer for JSON
    },
    parseValue(value: number) {
      return new Date(value) // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
      }
      return null // Invalid hard-coded value (not an integer)
    },
  }),
}

export default resolvers
