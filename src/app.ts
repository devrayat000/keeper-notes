import { join } from 'path'
import AutoLoad from 'fastify-autoload'
import type { FastifyPluginAsync } from 'fastify'
import mercuriusCodegen from 'mercurius-codegen'

import type { AppOptions } from './utils/types'
import './utils/module'
import codegen from './utils/codegen'

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })

  codegen(fastify)
}

export default app
export { app }
