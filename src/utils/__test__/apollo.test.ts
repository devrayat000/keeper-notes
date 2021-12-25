import {
  createTestClient,
  TestQuery,
  TestSetOptions,
} from 'apollo-server-integration-testing'

import { apolloServer } from '../'
import { dataSource } from '../../graphql/datasources'

const gql = String.raw

describe('ApolloServer', () => {
  let query: TestQuery
  let setOptions: TestSetOptions

  beforeAll(async () => {
    await apolloServer.start()

    const testClient = createTestClient({
      apolloServer: apolloServer as any,
    })
    query = testClient.query
    setOptions = testClient.setOptions
  })

  afterEach(done => {
    setOptions({})
    done()
  })

  afterAll(async () => {
    await apolloServer.stop()
  })

  it('should fetch todos', async () => {
    dataSource.keeper.getTodos = jest.fn().mockResolvedValue([{ _id: 'rr122' }])
    setOptions({
      request: {
        user: {
          _id: 'abcd1234',
        },
      },
    })

    const res = await query(gql`
      {
        todos {
          _id
        }
      }
    `)

    expect(dataSource.keeper.getTodos).toHaveBeenCalled()
    expect(res.data).toHaveProperty('todos')
    expect((res.data as any).todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
        }),
      ])
    )
  })

  it('should fetch labels', async () => {
    setOptions({
      request: {
        user: {
          _id: 'abcd1234',
        },
      },
    })
    dataSource.keeper.getLabels = jest
      .fn()
      .mockResolvedValue([{ _id: 'rr122' }])

    const res = await query(gql`
      {
        labels {
          _id
        }
      }
    `)

    expect(dataSource.keeper.getLabels).toHaveBeenCalled()
    expect(res.data).toHaveProperty('labels')
    expect((res.data as any).labels).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
        }),
      ])
    )
  })
})
