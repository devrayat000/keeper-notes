import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import session from 'express-session'

export const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  lazyConnect: true,
})

export const RedisStore = connectRedis(session)
// gas
