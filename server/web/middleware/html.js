const webpackToAssets = config => {
  return Object.keys(config.entry).reduce((prev, curr) => {
    return Object.assign(prev, {[curr]: {js: `${config.devServer.publicPath}${curr}.js?${new Date().getTime()}`}})
  }, {})
}
const mapSupportedBrowsersToProps = browsers => {
  return Object.keys(browsers).reduce((prev, curr) => {
    const browser = browsers[curr]
    if(!browser.y || [
      'chrome', 'firefox', 'edge', 'safari', 'opera',
    ].indexOf(curr) === -1) {
      return prev
    }
    
    return [ ...prev, { name: curr, y: browser.y } ]
  }, [])
}

const getAnalyticsSnippet = TrackingID => `
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', '${TrackingID}', 'auto');
ga('send', 'pageview');

</script>
`

module.exports = function(){
  var caniuse = require('caniuse-api')
  var meta = require('../../../package.json')

  const title = process.env.APP_NAME || meta.name

  var fallback = require('@stipsan/express-history-api-fallback')
  var minify = require('html-minifier').minify
  var assets, html
  
  const getSupportedBrowsers = caniuse.getSupport('websockets')
  const supportedBrowsers = mapSupportedBrowsersToProps(getSupportedBrowsers)
  const SUPPORTED_BROWSERS = JSON.stringify(supportedBrowsers)

  return fallback(function(req, res){
    if(!assets) {
      assets = 'production' === process.env.NODE_ENV ? 
        require('../../assets.json') :
        webpackToAssets(require('../../../webpack.config.js'))
      
      const css = [], js = []
      Object.keys(assets).forEach(key => {
        const bundle = assets[key]
        if(bundle.hasOwnProperty('css')) css.push(bundle.css)
        if(bundle.hasOwnProperty('js')) js.push(bundle.js)
      })
      const scripts     = js.map(script => `<script src="${script}"></script>`).join('')
      const stylesheets = css.map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`).join('')
      
      const analytics = process.env.TRACKING_ID ? getAnalyticsSnippet(process.env.TRACKING_ID) : ''
      
      html = `<!doctype html>
<html lang="en-US">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=9" />
    <meta charset="utf-8" />

    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${meta.description}" />
    <meta name="author" content="${meta.author}" />
    <meta name="keywords" content="${meta.keywords.join(',')}" />
    ${stylesheets}
  </head>
  <body>
    <div id="app">
      <noscript>
        <div style="
          background-image: linear-gradient(141deg, #ffbd3d 0%, #fce473 71%, #fffe8a 100%);
          backgound-color: #fce473;
          color: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        ">
          <h2 style="text-align: center; margin-top: 45vh;">${title} requires JavaScript and a modern browser to function correctly</h2>
        </div>
      </noscript>
    </div>
    ${analytics}
    <script>
      SUPPORTED_BROWSERS = ${SUPPORTED_BROWSERS};
    </script>
    ${scripts}
  </body>
</html>`

      if('production' === process.env.NODE_ENV) {
        html = minify(html, {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          collapseBooleanAttributes: true,
          removeTagWhitespace: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          preventAttributesEscaping: true,
          useShortDoctype: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
        })
      }
    }

    res.set('Cache-Control', 'max-age=60')

    res.send(html)
  })
}