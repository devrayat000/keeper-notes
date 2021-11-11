// integration.test.js | integration.test.ts
import Fastify from 'fastify'
import { createMercuriusTestClient } from 'mercurius-integration-testing'
import Mercurius from 'mercurius'
import { loadSchemaFiles } from 'mercurius-codegen'
import tap from 'tap'

import resolvers from '../src/graphql/resolvers'

// ...

tap.test('Should query hellowworld', async t => {
  const server = Fastify()
  const { schema } = loadSchemaFiles('src/graphql/schema/**/*.gql')

  server.register(Mercurius, {
    schema,
    resolvers,
    allowBatchedQueries: true,
  })
  await server.ready()

  const testClient = createMercuriusTestClient(server)

  const result = await testClient.query('query { helloWorld }')
  t.equal(result.data, {
    helloWorld: 'helloWorld',
  })
})
