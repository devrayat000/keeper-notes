// import { AutoloadPluginOptions } from 'fastify-autoload'

import { ExpressContext } from 'apollo-server-express'

import { dataSource } from '../graphql/datasources'

// export interface AppOptions extends Partial<AutoloadPluginOptions> {}

export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

export interface ApolloContext {
  readonly user: Express.User
  readonly dataSources: typeof dataSource
}
