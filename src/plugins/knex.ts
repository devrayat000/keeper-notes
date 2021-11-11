import fp from 'fastify-plugin'
import knex, { Knex } from 'knex'

export default fp<Knex.Config>(async (fastify, opts) => {
  const database = knex({
    client: 'pg',
    version: '13',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'ppooii12',
      database: 'keeper',
    },
  })

  database.on('query', data => {
    fastify.log.info(data.sql)
  })

  fastify.decorate('knex', database)
})
