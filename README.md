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
Review apps are also setup to help contributors, to easily test new code in Pull Requests without having to manually setup Heroku apps. It doesn't matter if the pull request is from the same repo, or is from a fork. It just works, automatically.

Here's the relevant config for each of them:
* [nightly.epic.vg](https://nightly.epic.vg) **development** - deploys automatically whenever code is pushed to `master`.
* [beta.epic.vg](https://beta.epic.vg) **staging** - also deploys `master` automatically, but [after CI pass](https://travis-ci.org/stipsan/epic).
* [epic.vg](https://epic.vg) **production** - same as staging, but deploys from `production` branch.

## More details about the Heroku apps

Each app have their own Redis instance and is completely isolated.
**development** and **staging** are relatively identical. They run on free plans.
That means each is limited to one free dyno, and run the free hobbyist redis plan.
This causes two important considerations:
1. Free dynos will go to sleep after 30 mins of inactivity, and waking it from sleep can cause the initial page load to take a minute or two.
2. Free redis storage is **not** persisted, meaning data is whiped now and then as redis instances reboot.

**production** is on a paid plan. Dynos are standard 1x, redis is on the `Premium 0` plan.
Data is persisted, and performance swift.

CloudFare is setup with very aggressive caching on all three domains, causing deploys to take up to 30 mins before you can see the changes.
If you can't see the new changes, check the `CF-Cache-Status` header and if it says `HIT` it's because CloudFlare haven't updated the cache with the new code yet.
The only way to bypass this cache layer is to access the Heroku app directly.
* [nightly.epic.vg](https://nightly.epic.vg) => (https://morning-stream-43659.herokuapp.com/)
* [beta.epic.vg](https://beta.epic.vg) => (https://agile-river-17606.herokuapp.com/)

[epic.vg](https://epic.vg) cannot be bypassed, accessing (https://getepic.herokuapp.com/) will redirect you to [epic.vg](https://epic.vg).This is to enforce a canonical domain for the game in production, protecting SEO and preventing ambiguity. Since CloudFlare requires a paid plan for secure websockets we've left open `getepic.herokuapp.com`.
This allows us to enforce SSL and turn on HTS without breaking our app.
Naturally, only clients that origin `epic.vg` can setup a WebSocket that talks with `getepic.herokuapp.com`.

### Development

This stage intentionally deploys code wether or not test pass in order to test bleeding edge ideas.


### Production

The `production` branch is meant to mirror what's tested, Q&A'd and deployed to the **production** pipeline.
Many intense performance optimizations is put in place. 
Every time css and js is bundled files with unique hashed names is generated.
This guarantees a new asset url whenever it changes. This is why we can tell browsers, and CloudFlare, to cache it for as long as a year at a time.

This readme will be updated throghout the project.