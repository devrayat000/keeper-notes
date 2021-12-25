import fs from 'fs'
import path from 'path'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { BaseRedisCache } from 'apollo-server-cache-redis'

import resolvers from '../graphql/resolvers'
import { dataSource } from '../graphql/datasources'
import { redisClient } from './cache'
import { authorize } from '../graphql/utils/auth'

const apolloServer = new ApolloServer<ExpressContext>({
  typeDefs: fs
    .readFileSync(
      path.resolve(process.cwd(), 'src', 'graphql', 'schema.graphql')
    )
    .toString(),
  resolvers,
  context: ({ req }) => {
    const user = authorize(req.user)
    return {
      user,
    }
  },
  dataSources: () => dataSource,
  cache: new BaseRedisCache({
    client: redisClient,
  }),
  debug: true,
  nodeEnv: process.env.NODE_ENV,
})

export default apolloServer
