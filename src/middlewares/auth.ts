import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import type { RequestHandler } from 'express'
import { catcher, HttpError } from './error-handler'

export function isAuthenticated(): RequestHandler {
  return catcher(async (req, res, next) => {
    if (!!req.user) {
      next()
    } else {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        new Error(ReasonPhrases.UNAUTHORIZED)
      )
    }
  })
}
