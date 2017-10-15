import { IncomingMessage, ServerResponse } from 'http'
import * as url from 'url'

export default (
  req: IncomingMessage,
  res: ServerResponse,
  parsedUrl: url.UrlObject | url.Url
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
