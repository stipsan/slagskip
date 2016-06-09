require('babel-register')({
  presets: ["react", "es2015", "stage-0"].map(preset =>
    require.resolve(`babel-preset-${preset}`)
  ),
  babelrc: false,
})
