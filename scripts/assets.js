const imagemin = require('imagemin')
const imageminOptipng = require('imagemin-optipng')
const imageminSvgo = require('imagemin-svgo')
const path = require('path')
const vfs = require('vinyl-fs')

const optipngOptions = { optimizationLevel: 7 }
const svgoOptions = {
  plugins: [
    { removeTitle: true },
    { removeDimensions: true },
  ]
}
const options = {
  use: [
    imageminOptipng(optipngOptions),
    imageminSvgo(svgoOptions)
  ]
}
const src = '' // using repo root as cwd 'assets/exports/'
const dest = '../../public' // ^^ 'public/'
const folders = ['favicons', 'bot', 'browser', 'vendor']

folders.map(folder => imagemin([`${folder}/*.{png,svg}`], `${dest}/${folder}`, options).then(files =>
  console.log(`[${folder}] Imagemin optimized these assets:`, files.map(file => file.path))
))
/*
// favicons
imagemin(
  // [path.resolve(__dirname, '..', 'assets', 'exports', 'favicons', '*.{png,svg}')],
  // path.resolve(__dirname, '..', 'public', 'favicons'),
  [
    `${src}favicons/*.{png,svg}`,
    `${src}bot/*.png`,
    `${src}browser/*.svg`,
    `${src}vendor/*.svg`,
  ],
  `${dest}`,
  options
).then(files => {
  console.log('Imagemin finished optimizing icons', files.map(file => file.path))
  // console.log(path.resolve(__dirname, '..', 'public', 'favicons'), files.map(file => file.path))
    //= > [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})
*/
// bots
/*
imagemin(
  // [path.resolve(__dirname, '..', 'assets', 'exports', 'bot', '*.png')],
  // path.resolve(__dirname, '..', 'public', 'bot'),
  { use: [imageminOptipng(optipngOptions)] }
)

// browsers
imagemin(
  // [path.resolve(__dirname, '..', 'assets', 'exports', 'browser', '*.svg')],
  // path.resolve(__dirname, '..', 'public', 'browser'),
  { use: [imageminSvgo(svgoOptions)] }
)
*/

// app manifest and browser xml
vfs.src(path.resolve(src, 'favicons', '*.{json,xml,ico}'))
   .pipe(vfs.dest(path.resolve(dest, 'favicons')))
