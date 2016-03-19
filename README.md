[![Build Status](https://travis-ci.org/stipsan/epic.svg)](https://travis-ci.org/stipsan/epic)
[![Coverage Status](https://coveralls.io/repos/github/stipsan/epic/badge.svg?branch=master)](https://coveralls.io/github/stipsan/epic?branch=master)
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

## Heroku pipeline

This project is setup in a |pipeline](https://devcenter.heroku.com/articles/pipelines#deployment-with-pipelines) on Heroku.
There are three domains and apps setup, one for each step: **development**, **staging** and **production**.
Review apps are also setup to help contributors, to easily test new code in Pull Requests without having to manually setup Heroku apps. It just works.

Here's the relevant config for each of them:
* [nightly.epic.vg](https://nightly.epic.vg) **development** - deploys automatically whenever code is pushed to `master`.
* [beta.epic.vg](https://beta.epic.vg) **staging** - also deploys `master` automatically, but [after CI pass](https://travis-ci.org/stipsan/epic).
* [epic.vg](https://epic.vg) **production** - same as staging, but deploys from `production` branch.

## More details about the Heroku apps



### Production

The `production` branch is meant to mirror what's tested, Q&A'd and deployed to the **production** pipeline.

