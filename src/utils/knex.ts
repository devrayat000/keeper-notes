import knex, { Knex } from 'knex'
import knexTinyLogger from 'knex-tiny-logger'
import knexConfig from '../../knexfile'

// const database = knex(knexConfig)
export const dbConfig = knexConfig[process.env.NODE_ENV ?? 'development'] ?? {}
const database: Knex = knexTinyLogger(knex(dbConfig))

// database.on('query', ({ sql }) => {
//   console.log(sql)
// })

export default database
