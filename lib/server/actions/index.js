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

var _gamePlay = require('./gamePlay');

Object.keys(_gamePlay).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gamePlay[key];
    }
  });
});

var _gameInvite = require('./gameInvite');

Object.keys(_gameInvite).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gameInvite[key];
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