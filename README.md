[![Dependency Status](https://david-dm.org/stipsan/epic.svg)](https://david-dm.org/stipsan/epic)

Realtime React based two-player game! Inspired by the good old "Battleship" by Hasbro.
Tech stack includes Redux, SocketCluster, Heroku, Redis and more!

It's intended to be both a learning excersise for myself to get familiar with tech I've never used before (SocketCluster, Redis) and sharpen my skills on stuff I've used a lot.

It's also meant to serve as a reference for others who wish to embark on similar projects :-)

# FAQ

## Why no RelayJS?

RelayJS and GraphQL don't support realtime communication out of the box yet.
Some have managed to marry websockets and Relay [already](https://github.com/facebook/relay/issues/652#issuecomment-162299541), but I've decided to wait for it to [land](https://github.com/facebook/relay/issues/541) in the core.
This way I can move fast and not worry about bugs due to using unstable dependencies.
Once RelayJS release the new Subscriptions API I'll revisit it and probably fork this project and port it to RelayJS to see how the two stack up against each other.