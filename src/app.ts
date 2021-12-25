import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import { apolloServer, env, redisClient, passportApp } from './utils'
import { errorApp, cookieSessionApp, bodyParserApp } from './middlewares'
import { authRouter } from './routes'

const corsOpts: cors.CorsOptions = {
  origin: ['*'],
  methods: ['GET', 'POST'],
  credentials: true,
}

const app = express()

app.use(cors(corsOpts))
app.use(logger(env.isDev ? 'dev' : 'short'))
app.use(bodyParserApp)

app.use(cookieSessionApp)
//

// app.use(errorApp)

console.log(process.env.NODE_ENV)

export default async function init() {
  await redisClient.connect()
  await apolloServer.start()

  if (env.isDev) {
    const { playgroundApp } = await import('./middlewares')
    app.use(playgroundApp)
  }

  app.use(passportApp)

  apolloServer.applyMiddleware({ app, cors: corsOpts })

  app.use('/auth', authRouter)

  return app
}
