import { IncomingMessage, ServerResponse } from 'http'
import { UrlObject, Url } from 'url'
import { microGraphiql, microGraphql } from 'apollo-server-micro'
import getSchema from './schema'

let memoizedHandler
const getGraphqlHandler = async (dev: Boolean) => {
  if (!memoizedHandler) {
    const schema = await getSchema()

    // To enable schema changes to apply without restarting the server
    if (dev) {
      return microGraphql({ schema })
    }

    memoizedHandler = microGraphql({ schema })
  }

  return memoizedHandler
}
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' })

export default async function backend(
  dev: Boolean,
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl: UrlObject | Url
) {
  const { pathname } = parsedUrl

  if (pathname === '/graphql') {
    const graphqlHandler = await getGraphqlHandler(dev)
    return graphqlHandler(req, res)
  }

  if (pathname === '/graphiql') {
    return graphiqlHandler(req, res)
  }

  return false
}
