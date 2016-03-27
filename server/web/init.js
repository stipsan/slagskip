// this is only to allow import/export syntax in /shared/* to be supported on node
// until --harmony_modules is stable in v8 and lands in node
// and until the object spread operator that landed in chrome 49 lands in nodejs soon
module.exports.run = function() {
  require('babel-register')({
    only: /shared|server/,
    plugins: ['transform-es2015-modules-commonjs', 'transform-object-rest-spread'],
    babelrc: false,
  })
}