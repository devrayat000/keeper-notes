// import type { FastifyInstance } from 'fastify'
// import type { FSWatcher } from 'fs'
// import mercuriusCodegen from 'mercurius-codegen'

// const codegen = (
//   fastify: FastifyInstance
// ): Promise<void | {
//   closeWatcher: () => Promise<boolean>
//   watcher: Promise<FSWatcher | undefined>
// }> => {
//   return mercuriusCodegen(fastify, {
//     targetPath: './src/graphql/generated.ts',
//     operationsGlob: './src/graphql/operations/*.gql',
//     codegenConfig: {
//       resolverTypeWrapperSignature:
//         'Promise<T> | T | (() => Promise<T>) | (() => T)',
//       scalars: {
//         Date: 'Date',
//       },
//     },
//     watchOptions: {
//       enabled: process.env.NODE_ENV === 'development',
//     },
//   }).catch(fastify.log.error)
// }

export default {};
