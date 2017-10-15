import server from '@epic/server'

// Pass down env variables to reduce hits to process.env to a minimum
// (accessing process.env is very slow, the more you access it the bigger the penalty)
server({
  dev: process.env.NODE_ENV !== 'production'
})