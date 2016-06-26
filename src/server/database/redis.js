import invariant from 'invariant'
import Redis from 'ioredis'

export const createConnection = url => {
  invariant(url, 'You must specify an redis url')

  return new Redis(url, { dropBufferSupport: true })
}
