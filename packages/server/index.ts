import { IncomingMessage, ServerResponse } from 'http'
import { UrlObject, Url } from 'url'

export default (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl: UrlObject | Url
) => {
  const { pathname } = parsedUrl

  console.log(req, res)

  if (pathname === '/graphql') {
    return 'graphql here'
  }

  if (pathname === '/graphiql') {
    return 'Graphiql IDE here'
  }

  return false
}
