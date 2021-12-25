// Update with your config settings.

import { Knex } from 'knex'

const base: Knex.Config = {
  client: 'pg',
  version: '13',
  migrations: {
    directory: './migrations',
  },
}

const knexConfig: KnexConf = {
  development: {
    ...base,
    connection: {
      host: 'localhost',
      port: 5066,
      user: 'postgres',
      password: 'ppooii12',
      database: 'postgres',
    },
    seeds: {
      directory: './seeds/development',
    },
  },
  test: {
    ...base,
    connection: {
      host: 'localhost',
      port: 5066,
      user: 'postgres',
      password: 'ppooii12',
      database: 'test',
    },
    seeds: {
      directory: './seeds/test',
    },
  },
  production: {
    ...base,
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './seeds/production',
    },
  },
}

type KnexConf = Partial<Conf>
type Conf = Record<NonNullable<NodeJS.ProcessEnv['NODE_ENV']>, Knex.Config>

export default knexConfig
