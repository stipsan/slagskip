const Imagemin = require('imagemin')
const path = require('path')

const optipngOptions = {optimizationLevel: 7}
const svgoOptions = {
  plugins: [
    { removeTitle: true },
    { removeDimensions: true },
  ]
}

// favicons
new Imagemin()
    .src(path.resolve(__dirname, '..', 'assets', 'exports', 'favicons', '*.{png,svg}'))
    .dest(path.resolve(__dirname, '..', 'public', 'favicons'))
    .use(Imagemin.optipng(optipngOptions))
    .use(Imagemin.svgo(svgoOptions))
    .run()

// bots
new Imagemin()
    .src(path.resolve(__dirname, '..', 'assets', 'exports', 'bot', '*.png'))
    .dest(path.resolve(__dirname, '..', 'public', 'bot'))
    .use(Imagemin.optipng(optipngOptions))
    .run()

// browsers
new Imagemin()
    .src(path.resolve(__dirname, '..', 'assets', 'exports', 'browser', '*.svg'))
    .dest(path.resolve(__dirname, '..', 'public', 'browser'))
    .use(Imagemin.svgo(svgoOptions))
    .run()

// app manifest and browser xml
const vfs = require('vinyl-fs')

vfs.src(path.resolve(__dirname, '..', 'assets', 'exports', 'favicons', '*.{json,xml}'))
  .pipe(vfs.dest(path.resolve(__dirname, '..', 'public', 'favicons')));