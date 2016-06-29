import bcrypt from 'bcrypt'
import RedisMock from 'ioredis-mock'

const lastVisit = '2016-03-22T00:15:46.757Z'
const password = bcrypt.hashSync('batman', 10)

const testRedis = new RedisMock({
  data: {
    user_next: '5',
    secret: 'used in password hashing',
    emails: {
      'clark@daily.planet': '2',
      'bruce@wayne.enterprises': '3',
      'peter.parker@dailybugle.com': '4',
      'lex@lex.corp': '5',
    },
    'user:2': { id: '2', username: 'superman', online: '1', email: 'clark@daily.planet' },
    'user:3': { id: '3', username: 'batman', online: '1', email: 'bruce@wayne.enterprises', password },
    'user:4': { id: '4', username: 'spiderman', online: '0', email: 'peter.parker@dailybugle.com' },
    'user:5': { id: '5', username: 'lex', online: '0', email: 'lex@lex.corp', lastVisit },
    'games:3': [],
    'user:2:invites': [],
    'user:3:invites': ['4', '5'],
    'user:4:invites': [],
    'user:5:invites': ['3'],
  },
})

export default testRedis
