var lint = require('mocha-eslint');

var paths = [
  'client',
  'server',
  'shared',
  'tests/**/.js',
  'webpack.config.js',
];

// @FIXME temp disable
//lint(paths);