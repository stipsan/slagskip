[![Dependency Status](https://david-dm.org/stipsan/epic.svg)](https://david-dm.org/stipsan/epic)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Realtime React based two-player game! Inspired by the good old "Battleship" by Hasbro.
Tech stack includes Redux, SocketCluster, Heroku, Redis and more!

It's intended to be both a learning excersise for myself to get familiar with tech I've never used before (SocketCluster, Redis) and sharpen my skills on stuff I've used a lot.

It's also meant to serve as a reference for others who wish to embark on similar projects :-)

# FAQ

## Why is (https://epic.vg) loading faster than lightning?

It's thanks to Herokus' Standard 1x dynos and CloudFlare's CDN combined with very agressive caching on all layers of the stack.
I'll share all the details later on Medium.

## How do I get started hacking away at this?

Assuming you've already got redis setup and running on your localhost, it's this easy:

1. Clone this repo
2. `npm install`
3. `npm start`

If installing a local redis isn't your cup of tea, hit the purple `Deploy` up top and [https://devcenter.heroku.com/articles/config-vars](reuse) the REDIS_URL env var the heroku-redis addon create after provision.

Be sure to install both the React and Redux Devtools for an developer experience like no other.
Complete with Hot Reload and Time Travel, making web development more fun than ever!

## Why no RelayJS?

RelayJS and GraphQL don't support realtime communication out of the box yet.
Some have managed to marry websockets and Relay [already](https://github.com/facebook/relay/issues/652#issuecomment-162299541), but I've decided to wait for it to [land](https://github.com/facebook/relay/issues/541) in the core.
This way I can move fast and not worry about bugs due to using unstable dependencies.
Once RelayJS release the new Subscriptions API I'll revisit it and probably fork this project and port it to RelayJS to see how the two stack up against each other.