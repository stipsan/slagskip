const lint = require('mocha-eslint')

const paths = [
  'src/client',
  'src/server',
  'src/shared',
  'webpack.config.js',
]
const options = {
  formatter: 'node_modules/eslint-formatter-pretty',
  alwaysWarn: false,
  slow: 5000,
}

lint(paths, options)
