import fp from 'fastify-plugin'
import fastifyEnv, { fastifyEnvOpt } from 'fastify-env'

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp<fastifyEnvOpt>(async (fastify, opts) => {
  void fastify.register(fastifyEnv, {
    confKey: 'env',
    prefix: 'PUBLIC',
    schema: {
      type: 'object',
      properties: {
        PUBLIC_DATABASE_CONNECTION: {
          type: 'string',
        },
      },
    },
    dotenv: true,
  })
})
