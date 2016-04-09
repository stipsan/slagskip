'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
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

var _match = require('./match');

Object.keys(_match).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _match[key];
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