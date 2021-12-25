import express from 'express'
import request from 'supertest'

import { isAuthenticated } from '../auth'

describe('Authenticated middleware', () => {
  it('should return UNAUTHORIZED if req.user is null', async () => {
    const app = express()
    app.all('*', async (req, res, next) => {
      req.user = undefined
      isAuthenticated()(req, res, next)
    })

    const res = await request(app)
      .get('/')
      .expect(401)
      .expect('Content-Type', /json/)

    expect(res.body).not.toHaveProperty('user')
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toEqual(
      expect.objectContaining({
        message: 'Unauthorized',
        name: expect.any(String),
      })
    )
  })

  it('should return UNAUTHORIZED if req.user is null', async () => {
    const app = express()
    app.all('*', async (req, res, next) => {
      req.user = { _id: 'abcd1234' } as Express.User

      isAuthenticated()(req, res, _ => {
        res.json({ user: req.user })
      })
    })

    const res = await request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).not.toHaveProperty('error')
    expect(res.body).toHaveProperty('user')
    expect(res.body).toEqual({
      user: expect.objectContaining({
        _id: expect.any(String),
      }),
    })
  })
})
