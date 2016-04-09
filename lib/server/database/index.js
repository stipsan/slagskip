'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('./auth');

Object.keys(_auth).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});

var _friends = require('./friends');

Object.keys(_friends).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _friends[key];
    }
  });
});

var _game = require('./game');

Object.keys(_game).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _game[key];
    }
  });
});

var _games = require('./games');

Object.keys(_games).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _games[key];
    }
  });
});

var _invite = require('./invite');

Object.keys(_invite).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _invite[key];
    }
  });
});

var _redis = require('./redis');

Object.keys(_redis).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _redis[key];
    }
  });
});

var _user = require('./user');

Object.keys(_user).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});

var _viewer = require('./viewer');

Object.keys(_viewer).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _viewer[key];
    }
  });
});