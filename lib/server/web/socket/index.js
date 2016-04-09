'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _middleware = require('./middleware');

Object.keys(_middleware).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _middleware[key];
    }
  });
});

var _server = require('./server');

Object.keys(_server).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _server[key];
    }
  });
});