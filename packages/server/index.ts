import { parse } from 'url'
import { IncomingMessage, ServerResponse } from 'http'

export default (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

  if (pathname === '/graphql') {
    return 'graphql here'
  }

  if (pathname === '/graphiql') {
    return 'Graphiql IDE here'
  }

  return false
}
