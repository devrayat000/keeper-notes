import express from 'express'
import { altairExpress } from 'altair-express-middleware'
import graphqlPlayground from 'graphql-playground-middleware-express'

const playgroundApp = express()

playgroundApp.get('/', (req, res) => {
  res.send(
    `
        <h1>Hello world!</h1>
      `
  )
})

playgroundApp.use(
  '/graphiql',
  graphqlPlayground({
    endpoint: '/graphql',
    settings: {
      'request.credentials': 'include',
    },
  })
)

playgroundApp.use(
  '/altair',
  altairExpress({
    endpointURL: '/graphql',
    initialQuery: `query { notes { _id } }`,
    initialSettings: { 'request.withCredentials': true },
  })
)

export default playgroundApp
