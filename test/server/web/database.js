import expect from 'expect'
import * as database from '../../../server/web/database'
import Redis from 'ioredis'
import mockRedis from '../../mockRedis'

const successCredentials = { username: 'batman' }
const successAuthToken = { 
  id: 3,
  username: successCredentials.username,
  privateChannel: `user:3`
}
const failureCredentials = { username: 'wonderwoman' }

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
  
  it('fetches list of friends', () => {
    return database.getFriends({
      id: successAuthToken.id,
      friends: [2, 4, 5],
      invites: [4, 5]
    }, mockRedis)
      .then(friends => {
        expect(friends).toEqual([
          {
            id: 2,
            username: 'superman',
            inviteIn: false,
            inviteOut: false,
            online: true,
          },
          {
            id: 4,
            username: 'spiderman',
            inviteIn: true,
            inviteOut: false,
            online: false,
          },
          {
            id: 5,
            username: 'lex',
            inviteIn: true,
            inviteOut: true,
            online: false,
            lastVisit: '2016-03-22T00:15:46.757Z',
          }
        ])
      })
  })
  
  it('can create new users', () => {
    return database.createUser({
      username: 'logan'
    }, mockRedis)
      .then(user => {
        expect(user).toEqual({
          id: 6,
          username: 'logan',
          privateChannel: 'user:6'
        })
      })
  })
  
  it('updates users online status', () => {
    const lastVisit = new Date().toJSON()
    return database.setViewerOffline(successAuthToken, lastVisit, mockRedis)
      .then(user => {
        expect(user).toEqual({
          id: 3,
          online: false,
          lastVisit
        })
      })
  })
  
  it('should send invites to friends', () => {
    const friendId = 2
    return database.viewerSendsInvite(successAuthToken, friendId, mockRedis)
      .then(friend => {
        expect(friend).toEqual({
          id: friendId,
          inviteOut: true
        })
      })
  })
  
  it('can cancel invites sent to friend', () => {
    const friendId = 2
    return database.viewerCancelsInvite(successAuthToken, friendId, mockRedis)
      .then(friend => {
        expect(friend).toEqual({
          id: friendId,
          inviteOut: false
        })
      })
  })
  
  it('can accept received invites', () => {
    const friendId = 4
    return database.viewerAcceptsInvite(successAuthToken, friendId, mockRedis)
      .then(friend => {
        expect(friend).toEqual({
          id: friendId,
          inviteOut: true
        })
      })
  })
  
  it('can decline received invites', () => {
    const friendId = 5
    return database.viewerDeclinesInvite(successAuthToken, friendId, mockRedis)
      .then(friend => {
        expect(friend).toEqual({
          id: friendId,
          inviteIn: false
        })
      })
  })
})