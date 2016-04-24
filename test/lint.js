var lint = require('mocha-eslint');

var paths = [
  'src',
  'tests/**/.js',
  'webpack.config.js',
];

lint(paths);