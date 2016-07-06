require('babel-register')({
  presets: ['react', 'es2015', 'stage-0'].map(preset =>
    require.resolve(`babel-preset-${preset}`)
  ),
  plugins: ['istanbul'].map(plugin =>
    require.resolve(`babel-plugin-${plugin}`)
  ),
  babelrc: false,
})
