import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'

import { redisClient, RedisStore, env } from '../utils'

const cookieSessionApp = express()

cookieSessionApp.use(cookieParser(process.env.COOKIE_SECRET))
cookieSessionApp.use(
  session({
    cookie: {
      maxAge: 3600 * 10000000,
      // maxAge: 3600 * 24 * 7, // 7 Days
      secure: env.isProd,
      signed: env.isProd,
      httpOnly: env.isProd,
    },
    secret: process.env.SESSION_SECRET ?? 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
  })
)

export default cookieSessionApp
