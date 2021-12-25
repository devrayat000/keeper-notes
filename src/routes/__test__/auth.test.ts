import request from 'supertest'
import express from 'express'
import faker from 'faker'
import mockDb from 'mock-knex'

import authRouter from '../auth'
import bodyParserApp from '../../middlewares/body-parser'
import passportApp from '../../utils/passport'
import errorApp from '../../middlewares/error-handler'
import cookieSessionApp from '../../middlewares/cookie-session'
import { database } from '../../utils'

jest.setTimeout(5000 * 3)

describe('AuthAPI', () => {
  let app: express.Express
  let tracker: mockDb.Tracker

  beforeAll(async () => {
    tracker = mockDb.getTracker()
    mockDb.mock(database)
  })

  beforeEach(async () => {
    tracker.install()
    app = express()
    app.use(bodyParserApp)
    app.use(cookieSessionApp)
    app.use(errorApp)
    app.use(passportApp)
    app.use('/auth', authRouter)
  })

  afterAll(async () => {
    mockDb.unmock(database)
  })

  afterEach(async () => {
    tracker.uninstall()
  })

  it('should GET /auth/register --> User', async () => {
    const insertId = faker.datatype.number()

    const newUser = {
      email: 'supertest3@test.com',
      name: 'SuperTest3',
      password: 'test1234',
    }

    tracker.on('query', query => {
      expect(query.method).toEqual('insert')
      query.response([
        {
          _id: insertId,
          ...newUser,
        },
      ])
    })

    const res = await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(newUser)
      .expect('Content-type', /json/i)
      .expect(201)

    expect(res.body).toEqual(
      expect.objectContaining({
        message: 'Created new account',
        user: expect.objectContaining({
          _id: insertId,
          email: newUser.email,
          name: newUser.name,
        }),
      })
    )
  })
})
