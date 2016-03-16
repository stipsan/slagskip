const title = process.env.APP_NAME || 'This app'

const webpackToAssets = config => {
  return Object.keys(config.entry).reduce((prev, curr) => {
    return Object.assign(prev, {[curr]: {js: `${config.devServer.publicPath}${curr}.js?${new Date().getTime()}`}})
  }, {})
}
const mapSupportedBrowsersToProps = browsers => {
  return Object.keys(browsers).reduce((prev, curr) => {
    const browser = browsers[curr];
    if(!browser.y || [
      'chrome', 'firefox', 'edge', 'safari', 'opera'
    ].indexOf(curr) === -1) {
      return prev
    }
    
    return [ ...prev, { name: curr, y: browser.y } ]
  }, [])
}

module.exports = function(){
  var caniuse = require('caniuse-api');

  var fallback = require('@stipsan/express-history-api-fallback');
  var minify = require('html-minifier').minify;
  var assets, html;
  
  const getSupportedBrowsers = caniuse.getSupport('websockets')
  const supportedBrowsers = mapSupportedBrowsersToProps(getSupportedBrowsers);
  const SUPPORTED_BROWSERS = JSON.stringify(supportedBrowsers);
  console.log(supportedBrowsers);
  const browsersList = supportedBrowsers.map(browser => `<a 
    href="http://lmgtfy.com/?q=${browser.name}"
    title="${browser.y}"
    target="_blank"
  >
      <img src="/browser/${browser.name}.svg" style="height: 64px; width: 64px;" />
      <span>${browser.name}</span>
  </a>`).join('');

  return fallback(function(req, res, next){
    if(!assets) {
      assets = 'production' === process.env.NODE_ENV ? 
        require('../assets.json') :
        webpackToAssets(require('../../webpack.config.js'))
      
      const css = [], js = [];
      Object.keys(assets).forEach(key => {
        const bundle = assets[key];
        if(bundle.hasOwnProperty('css')) css.push(bundle.css);
        if(bundle.hasOwnProperty('js')) js.push(bundle.js);
      });
      const scripts     = js.map(script => `<script src="${script}"></script>`).join('');
      const stylesheets = css.map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`).join('');
      
      html = `<!doctype html>
<html lang="en-US">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=9" />
    <meta charset="utf-8" />

    <title>Loading ${title}…</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${stylesheets}
  </head>
  <body>
    <div id="app">
      <noscript>
        <div class="page">
          <div class="section section--unsupported-browser">
            <h2>${title} requires JavaScript and a modern browser to function correctly.</h2>
            <p>Recommended browsers:</p>
            <p>${browsersList}</p>
          </div>
        </div>
      </noscript>
    </div>
    <script>
      SUPPORTED_BROWSERS = ${SUPPORTED_BROWSERS};
    </script>
    ${scripts}
  </body>
</html>`;

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
        });
      }
    }

    // 2 hour cache, helps prevent flooding and hide dyno deployment downtime
    // if deployments are breaking, let maintenance:on run for 2h or purge cf cache
    res.set('Cache-Control', 'max-age=60');

    res.send(html);
  });
};