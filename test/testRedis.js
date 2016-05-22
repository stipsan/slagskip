import _ from 'lodash'

const testRedis = {
  data: {
    user_next: 5,
    secret: 'used in password hashing',
    emails: {
      'clark@daily.planet': 2,
      'bruce@wayne.enterprises': 3,
      'peter.parker@dailybugle.com': 4,
      'lex@lex.corp': 5,
    },
    ['user:2']: { id: 2, username: 'superman', online: '1', email: 'clark@daily.planet' },
    ['user:3']: { id: 3, username: 'batman', online: '1', email: 'bruce@wayne.enterprises' },
    ['user:4']: { id: 4, username: 'spiderman', online: '0', email: 'peter.parker@dailybugle.com' },
    ['user:5']: { id: 5, username: 'lex', online: '0', email: 'lex@lex.corp', lastVisit: '2016-03-22T00:15:46.757Z' },
    ['games:3']: [],
    ['user:2:invites']: [],
    ['user:3:invites']: [4, 5],
    ['user:4:invites']: [],
    ['user:5:invites']: [3],
  },
  incr(key) {
    return new Promise(resolve => {
      resolve(++this.data[key])
    })
  },
  hsetnx(key, hashKey, hashVal) {
    return new Promise(resolve => {

      if (!this.data.hasOwnProperty(key)) {
        this.data[key] = {}
      }
      const exists = this.data[key].hasOwnProperty(hashKey)
      this.data[key][hashKey] = hashVal

      resolve(!exists)
    })
  },
  hmset(key, ...hmsetData) {
    return new Promise(resolve => {
      if (!this.data.hasOwnProperty(key)) {
        this.data[key] = {}
      }
      for (let i = 0; i < hmsetData.length; i += 2) {
        this.data[key][hmsetData[i]] = hmsetData[i + 1]
      }

      resolve('OK')
    })
  },
  sadd(key, val) {
    return new Promise(resolve => {
      this.data[key].push(val)
      resolve(1)
    })
  },
  srem(key, val) {
    return new Promise(resolve => {
      const index = this.data[key].indexOf(val)
      this.data[key].splice(index, 1)
      resolve(1)
    })
  },
  hget(key, value) {
    return new Promise(resolve => {
      return resolve(this.data[key][value])
    })
  },
  hvals(key) {
    return new Promise(resolve => {
      resolve(_.values(this.data[key]))
    })
  },
  hgetall(key) {
    return new Promise((resolve, reject) => {
      resolve(this.data[key])
    })
  },
  smembers(key) {
    return new Promise((resolve, reject) => {
      resolve(this.data[key])
    })
  },
  sismember(key, val) {
    return new Promise(resolve => {
      resolve(this.data[key].indexOf(val) !== -1)
    })
  },
  hset() {
    return new Promise(resolve => {
      resolve('OK')
    })
  },
  multi(batch) {
    this.batch = batch.map(([command, ...options]) => this[command].bind(this, ...options))

    return this
  },
  exec() {
    return Promise.all(this.batch.map(promise => promise()))
      .then(results => results.map(result => [null, result]))
  }
}

export default testRedis
