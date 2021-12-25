import type { ApolloContext } from '../../utils'
import type { QueryResolvers } from '../generated'

type IQueryResolvers = QueryResolvers<ApolloContext>

export const labelQuery: IQueryResolvers['labels'] = async (
  _parent,
  { limit },
  { dataSources, user },
  info
) => {
  // let result = knex.select().from("label").orderBy("_id");

  // if (!!limit) {
  //   result = result.limit(limit);
  // }

  // return result;

  return dataSources.keeper.getLabels({ limit, info, userId: user._id })
}

export const todoQuery: IQueryResolvers['todos'] = async (
  _parent,
  { limit },
  { dataSources, user },
  info
) => {
  // let fields = Object.keys(graphqlFields(_info));
  // if (!fields.includes("_id")) {
  //   fields.unshift("_id");
  // }
  // if (fields.includes("notes")) {
  //   fields = fields.filter((f) => f !== "notes");
  // }
  // console.log(fields);

  // let result = knex
  //   .select(...fields)
  //   .from("todo")
  //   .orderBy("_id");

  // if (!!limit) {
  //   result = result.limit(limit);
  // }
  // let a = await result;

  // return a as Todo[];

  return dataSources.keeper.getTodos({ limit, info, userId: user._id })
}

export const userQuery: IQueryResolvers['user'] = async (
  _parent,
  _args,
  { user },
  _info
) => {
  return user as any
}
