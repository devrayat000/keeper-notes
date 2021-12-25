import express from 'express'
import _passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import type { UserTable } from 'knex/types/tables'

import { verifyPassword } from './bcrypt'
import knex from './knex'

export function initializeLocal(passport: _passport.Authenticator) {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = (await knex('user').where({ email }).limit(1))[0]
          if (!user) {
            done(null, false, { message: 'Invalid user' })
          }
          if (!(await verifyPassword(password, user.hash))) {
            done(null, false, { message: 'Invalid password' })
          }
          return done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )
}

const passport = new _passport.Passport()

passport.serializeUser<string>((user, done) => {
  done(null, user._id)
})

passport.deserializeUser<string>(async (id, done) => {
  try {
    const user = await knex('user').where({ _id: id }).limit(1)
    done(null, user[0])
  } catch (error) {
    done(error)
  }
})

export { passport }

const passportApp = express()

passportApp.use(passport.initialize())
passportApp.use(passport.session())

initializeLocal(passport)

export default passportApp

declare global {
  namespace Express {
    interface User extends UserTable {}
  }
}
