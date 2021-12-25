import { AssertionError } from 'assert'
import express from 'express'
import request from 'supertest'
import { ValidationError } from 'yup'

import { errorHandler } from '../error-handler'

describe('Error Handler App', () => {
  let app: express.Express
  beforeEach(() => {
    app = express()
  })

  it('should return a json containing error name and message', async () => {
    const error = new Error('Random error')
    app.all('*', errorHandler.bind(null, error))

    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)

    expect(res.body).toEqual(
      expect.objectContaining({
        name: Error.name,
        message: error.message,
      })
    )
  })

  it('should catch validation error', async () => {
    const error = new ValidationError('Random error')
    app.all('*', errorHandler.bind(null, error))

    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)

    expect(res.body).toEqual(
      expect.objectContaining({
        name: ValidationError.name,
        message: error.message,
        errors: expect.arrayContaining([expect.any(String)]),
      })
    )

    expect(res.error).toBeInstanceOf(Error)
  })

  it('should catch validation error', async () => {
    const error = new AssertionError({ message: 'Random error' })
    app.all('*', errorHandler.bind(null, error))

    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)

    expect(res.body).toEqual(
      expect.objectContaining({
        name: AssertionError.name,
        message: error.message,
      })
    )

    expect(res.error).toBeInstanceOf(Error)
  })
})
