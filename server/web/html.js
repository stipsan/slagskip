//@TODO implement using dataloader

const webpackToAssets = config => {
  return Object.keys(config.entry).reduce((prev, curr) => {
    return Object.assign(prev, {[curr]: {js: `${config.devServer.publicPath}${curr}.js?${new Date().getTime()}`}})
  }, {})
}

module.exports = function(){
  var fallback = require('@stipsan/express-history-api-fallback');
  var assets, html;

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
<html>
  <head>
    <title>Loading game…</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${stylesheets}
  </head>
  <body>    
    <div id="app"></div>
    ${scripts}
  </body>
</html>`;
    }
    
    res.send(html);
  });
};