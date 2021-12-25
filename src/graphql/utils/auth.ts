import { AuthenticationError } from 'apollo-server-express'

export function authorize(user?: Express.User) {
  if (!user) {
    throw new AuthenticationError('Unauthorized')
  }
  return user
}
