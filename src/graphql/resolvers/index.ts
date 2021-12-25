import { labelQuery, todoQuery, userQuery } from './query'
import {
  addLabelToTodoMutation,
  copyTodoMutation,
  createLabelMutation,
  createTodoMutation,
  deleteLabelMutation,
  deleteTodoMutation,
  updateLabelMutation,
  updateNotesMutation,
  updateTodoMutation,
} from './mutations'
import { dateScalar } from './scalars'
import type { Resolvers } from '../generated'
import type { ApolloContext } from '../../utils'

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    labels: labelQuery,
    todos: todoQuery,
    user: userQuery,
  },
  Mutation: {
    createTodo: createTodoMutation,
    updateTodo: updateTodoMutation,
    deleteTodo: deleteTodoMutation,
    copyTodo: copyTodoMutation,

    updateNotes: updateNotesMutation,

    createLabel: createLabelMutation,
    updateLabel: updateLabelMutation,
    deleteLabel: deleteLabelMutation,

    addLabelToTodo: addLabelToTodoMutation,
    //   Subscription: {
    //     newNotification: {
    //       subscribe: (_root, _args, { pubsub }) => {
    //         return pubsub.subscribe(NOTIFICATION)
    //       },
    //     },
    //   },
  },
  Todo: {
    notes(parent, {}, { dataSources, user }, _info) {
      return dataSources.keeper.getNotesForTodo({
        id: parent._id,
        user_id: user._id,
      })
    },
    labels(parent, {}, { dataSources, user }, _info) {
      return dataSources.keeper.getLabelsForTodo({
        id: parent._id,
        user_id: user._id,
      })
    },
  },
  User: {
    todos({ _id }, {}, { dataSources }) {
      return dataSources.keeper.getTodosForUser(_id)
    },
    labels({ _id }, {}, { dataSources }) {
      return dataSources.keeper.getLabelsForUser(_id)
    },
  },
  Date: dateScalar,
}

export default resolvers
