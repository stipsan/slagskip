import expect from 'expect'
import * as database from '../../../server/web/database'
import Redis from 'ioredis'

const mockRedis = {
  hget(key, value) {
    return new Promise(resolve => {
      switch (key) {
        case 'users':
          return resolve(value === 'batman' ? 3 : value === 'wonderwoman' ? 2 : null)
      }
    })
  }
}

describe('database business logic', () => {
  it('can connect to redis',  () => {
    expect(database.createConnection)
      .toThrow('You must specify an redis url')

    expect(database.createConnection('localhost'))
      .toBeA(Redis)
  })
  
  it('handles failed authentication', (done) => {
    database.authenticate({ username: 'superman' }, mockRedis)
      .then(authToken => {
        done(new Error('Promise were not rejected'))
      })
      .catch(err => {
        done()
      })
  })

  it('returns authToken data on successfull authentication',  () => {
    return database.authenticate({ username: 'batman' }, mockRedis)
      .then(authToken => {
        expect(authToken).toBe({
          id: 1,
          username: 'batman',
          privateChann: 'user:1'
        })
      })
  })
  
  it('fetches friends authentication', () => {
    
  })
})