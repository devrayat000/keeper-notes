import { Router } from 'express'
import path from 'path'
import { StatusCodes } from 'http-status-codes'

import {
  hashPassword,
  env,
  database as knex,
  passport,
  signupValidator,
} from '../utils'
import { catcher, error } from '../middlewares/error-handler'

const authRouter = Router()

const html = (name: string) =>
  path.join(process.cwd(), 'src', 'html', `${name}.html`)

authRouter.post(
  '/register',
  catcher(async (req, res) => {
    try {
      const { email, name, password } = await signupValidator.validate(req.body)
      const { hash, salt } = await hashPassword(password)

      const user = await knex('user')
        .insert({ email, name, hash, salt })
        .returning('*')

      req.logIn(user[0], err => {
        if (!!err) {
          throw error(err, StatusCodes.BAD_REQUEST)
        }
      })

      res
        .status(StatusCodes.CREATED)
        // .redirect('user')
        .json({ message: 'Created new account', user: extractUser(user[0]) })
    } catch (err) {
      throw error(err)
    }
  })
)

authRouter.post(
  '/login',
  passport.authenticate('local'),
  catcher(async (req, res) => {
    res.status(StatusCodes.ACCEPTED).json({
      message: 'Successfully logged in!',
      user: extractUser(req.user!),
    })
    // res.status(StatusCodes.CREATED).redirect('user')
  })
)

authRouter.post(
  '/logout',
  catcher(async (req, res) => {
    req.logOut()
    res.status(StatusCodes.OK).json({
      message: 'Successfully logged out!',
    })
    // res.status(StatusCodes.TEMPORARY_REDIRECT).redirect('login')
  })
)

if (env.isDev) {
  authRouter.get('/register', (req, res) => {
    res.sendFile(html('register'))
  })

  authRouter.get('/login', (req, res) => {
    res.sendFile(html('login'))
  })

  authRouter.get('/logout', (req, res) => {
    res.sendFile(html('logout'))
  })

  authRouter.get('/user', (req, res) => {
    // console.log('User Req:', req)

    if (!req.user) {
      return res.status(StatusCodes.UNAUTHORIZED).redirect('login')
    }
    res.send(`<pre>
      ${JSON.stringify({ user: extractUser(req.user) }, null, 2)}
    </pre>`)
  })
}

export default authRouter

function extractUser(user: Express.User) {
  const { hash: dbHash, salt: dbSalt, ...newUser } = user
  return newUser
}
// ESL
