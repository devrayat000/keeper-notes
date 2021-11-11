import fp from 'fastify-plugin'
import mercurius, { MercuriusOptions } from 'mercurius'
import { loadSchemaFiles } from 'mercurius-codegen'
import { buildSchema } from 'graphql'

import resolvers from '../graphql/resolvers'
import loaders from '../graphql/loaders'
import codegen from '../utils/codegen'

export default fp<MercuriusOptions>(async (fastify, opts) => {
  const { schema } = loadSchemaFiles('src/graphql/schema/**/*.gql', {
    watchOptions: {
      enabled: process.env.NODE_ENV === 'development',
      onChange(schema) {
        fastify.graphql.replaceSchema(buildSchema(schema.join('\n')))
        fastify.graphql.defineResolvers(resolvers)

        return codegen(fastify)
      },
    },
  })

  void fastify.register(mercurius, {
    schema,
    resolvers,
    loaders,
    context: (req, _reply) => {
      return {
        authorization: req.headers.authorization,
      }
    },
    subscription: true,
    graphiql: false,
    ide: false,
    path: '/graphql',
    logLevel: 'trace',
    jit: 1,
    ...opts,
  })
})
