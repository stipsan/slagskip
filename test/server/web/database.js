import expect from 'expect'
import * as database from '../../../server/web/database'
import Redis from 'ioredis'

const successCredentials = { username: 'batman' }
const successAuthToken = { 
  id: 3,
  username: successCredentials.username,
  privateChannel: `user:3`
}
const failureCredentials = { username: 'wonderwoman' }

const mockRedis = {
  hget(key, value) {
    return new Promise(resolve => {
      switch (key) {
        case 'users':
          return resolve(value === 'batman' ? 3 : value === 'superman' ? 2 : null)
      }
    })
  },
  hgetall(key) {
    return new Promise(resolve => {
      switch (key) {
        case 'users':
          return resolve([2, 3, 4, 5])
      }
    })
  },
  smembers(key) {
    return new Promise((resolve, reject) => {
      switch (key) {
        case 'user:2:invites':
          return resolve([3])
        case 'user:3:invites':
          return resolve([4, 5])
        default:
          return reject(key)
      }
    })
  },
  hset() {
    return new Promise(resolve => {
      resolve('OK')
    })
  },
  multi(batch) {
    this.batch = batch.map(([command, ...options]) => this[command].bind(command, ...options))
    
    return this
  },
  exec() {
    return Promise.all(this.batch.map(promise => promise()))
      .then(results => results.map(result => [null, result]))
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
    database.authenticate(failureCredentials, mockRedis)
      .then(authToken => {
        done(new Error('Promise were not rejected'))
      })
      .catch(err => {
        done()
      })
  })

  it('returns authToken data on successfull authentication',  () => {
    return database.authenticate(successCredentials, mockRedis)
      .then(authToken => {
        expect(authToken).toEqual(successAuthToken)
      })
  })
  
  it('fetches authenticated viewer', () => {
    return database.getViewer(successAuthToken, mockRedis)
      .then(viewer => {
        expect(viewer).toEqual({
          friends: [2, 4, 5],
          invites: [4, 5]
        })
      })
  })
})