var lint = require('mocha-eslint')

var paths = [
  'src',
  'tests/**/.js',
  'webpack.config.js',
]

var options = {
  formatter: 'node_modules/eslint-formatter-pretty'
}

lint(paths, options)
