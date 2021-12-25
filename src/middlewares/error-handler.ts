import { AssertionError } from 'assert'
import express, { ErrorRequestHandler, RequestHandler } from 'express'
import { ValidationError } from 'yup'
import Code, { ReasonPhrases } from 'http-status-codes'

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

export const clientErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (req.xhr) {
    return res
      .status(Code.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST })
  } else {
    next(err)
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let json = {}

  if (err instanceof ValidationError) {
    json = {
      name: err.name,
      message: err.message,
      errors: err.errors,
    }
  } else if (err instanceof AssertionError) {
    json = {
      name: err.name,
      message: err.message,
    }
  } else if (err instanceof Error) {
    json = {
      name: err.name,
      message: err.message,
    }
  } else {
    json = {
      name: 'Unknown Error',
      message: 'Something went wrong!',
    }
  }

  return res.status(500).json(json)
}

const errorApp = express()

errorApp.use(errorLogger)
errorApp.use(clientErrorHandler)
errorApp.use(errorHandler)

export default errorApp

export class HttpError {
  constructor(public status: number, public error: Error) {}
}

export const catcher = (callback: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next)
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: parseError(error.error) })
      } else {
        res.status(500).json({ error: 'Internal server error!' })
      }
    }
  }
}

export function error(err: any, status: number = 500) {
  if (err instanceof Error) {
    return new HttpError(status, err)
  } else {
    return err
  }
}

function parseError(err: Error) {
  if (err instanceof ValidationError) {
    return {
      name: err.name,
      message: err.message,
      errors: err.errors,
    }
  } else if (err instanceof AssertionError) {
    return {
      name: err.name,
      message: err.message,
    }
  } else if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
    }
  } else {
    return {
      name: 'Unknown Error',
      message: 'Something went wrong!',
    }
  }
}
