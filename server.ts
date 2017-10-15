import micro from 'micro'
import { parse } from 'url'
import * as next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = micro(async (req, res) => {
  const parsedUrl = parse(req.url, true)
  const { pathname, query } = parsedUrl

  console.log(parsedUrl, parsedUrl.pathname)

  if (pathname === '/graphql') {
    return 'graphql here'
  }

  if (pathname === '/graphiql') {
    return 'Graphiql IDE here'
  }

  return handle(req, res, parsedUrl)
})

app.prepare().then(() => {
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
