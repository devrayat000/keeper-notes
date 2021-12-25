import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (!(value instanceof Date)) {
      throw new TypeError('Invalid value for date serialization')
    }
    return value.getTime() // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    if (typeof value !== 'number' || typeof value !== 'string') {
      throw new TypeError('Invalid value for date deserialization')
    }
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new TypeError('Invalid hard-coded value (not an integer)')
    }
    return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
  },
})
