import fp from 'fastify-plugin'
import atlairFastify, {
  AltairFastifyPluginOptions,
} from 'altair-fastify-plugin'

export default fp<AltairFastifyPluginOptions>(async (fastify, _opts) => {
  void fastify.register(atlairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    ..._opts,
  })
})
