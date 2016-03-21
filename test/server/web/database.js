import expect from 'expect'
import * as database from '../../../server/web/database'
import Redis from 'ioredis'

describe('database business logic', () => {
  it('can connect to redis',  () => {
    expect(database.createConnection)
      .toThrow('You must specify an redis url')

    expect(database.createConnection('localhost'))
      .toBeA(Redis)
  })
  
  it('handles authenticating users',  () => {
    
  })
  
  it('fetches friends authentication', () => {
    
  })
})