'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

const webpackToAssets = config => {
  return Object.keys(config.entry).reduce((prev, curr) => {
    return Object.assign(prev, { [curr]: { js: `${ config.devServer.publicPath }${ curr }.js?${ new Date().getTime() }` } });
  }, {});
};
const mapSupportedBrowsersToProps = browsers => {
  return Object.keys(browsers).reduce((prev, curr) => {
    const browser = browsers[curr];
    if (!browser.y || ['chrome', 'firefox', 'edge', 'safari', 'opera'].indexOf(curr) === -1) {
      return prev;
    }

    return [].concat(_toConsumableArray(prev), [{ name: curr, y: browser.y }]);
  }, []);
};

const getAnalyticsSnippet = TrackingID => `
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', '${ TrackingID }', 'auto');
ga('send', 'pageview');

</script>
`;

module.exports = function () {
  var caniuse = require('caniuse-api');
  var meta = require('../../../../package.json');
  const parseUrl = require('stattic-parseurl');

  const title = process.env.APP_NAME || meta.name;

  var fallback = require('@stipsan/express-history-api-fallback');
  var minify = require('html-minifier').minify;
  var assets, html;

  const getSupportedBrowsers = caniuse.getSupport('websockets');
  const supportedBrowsers = mapSupportedBrowsersToProps(getSupportedBrowsers);
  const SUPPORTED_BROWSERS = JSON.stringify(supportedBrowsers);
  const socketHost = process.env.SOCKET_HOSTNAME;
  const preconnect = socketHost && `
    <link rel="dns-prefetch" href="https://${ socketHost }" />
    <link rel="preconnect" href="https://${ socketHost }" />
  ` || '';
  console.log('preconnect', preconnect);
  const shouldLoadRaygun = process.env.RAYGUN_APIKEY || false;

  const raygunClient = `<script type="text/javascript">
  !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
  (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
  f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
  h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
  e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
</script>`;
  const raygunInit = `<script type="text/javascript">
  rg4js('apiKey', ${ JSON.stringify(process.env.RAYGUN_APIKEY) });
  rg4js('enableCrashReporting', true);
  rg4js('enablePulse', true);
</script>`;

  return fallback(function (req, res, next) {
    var _parseUrl = parseUrl(req.url);

    const ext = _parseUrl.ext;


    if (ext !== '' && ext !== 'html') {
      console.warn('404', req.url);
      return next();
    }

    if (!assets) {
      assets = 'production' === process.env.NODE_ENV ? require('../../assets.json') : webpackToAssets(require('../../../../webpack.config.js'));

      const css = [],
            js = [];
      Object.keys(assets).forEach(key => {
        const bundle = assets[key];
        if (bundle.hasOwnProperty('css')) css.push(bundle.css);
        if (bundle.hasOwnProperty('js')) js.push(bundle.js);
      });
      const scripts = js.map(script => `<script async src="${ script }"></script>`).join('');
      //const stylesheets = css.map(stylesheet => `<link rel="stylesheet" href="${stylesheet}">`).join('')
      const stylesheets = css.map((href, index) => `
      var l${ index } = document.createElement('link'); l${ index }.rel = 'stylesheet';
      l${ index }.href = '${ href }';
      h.appendChild(l${ index });`).join('');
      const loadCSS = stylesheets && `
      <script>
        var cb = function() {
          var h = document.getElementsByTagName('head')[0];
          ${ stylesheets }
        };
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        if (raf) raf(cb);
        else window.addEventListener('load', cb);
      </script>
      ` || '';

      const analytics = process.env.TRACKING_ID ? getAnalyticsSnippet(process.env.TRACKING_ID) : '';

      html = `<!doctype html>
<html lang="en-US">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7, IE=9" />
    <meta charset="utf-8" />

    <title>${ title }</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="description" content="${ meta.description }" />
    <meta name="author" content="${ meta.author }" />
    <meta name="keywords" content="${ meta.keywords.join(',') }" />
    
    <link rel="apple-touch-icon" sizes="57x57" href="/favicons/icon-57.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/favicons/icon-76.png">
    <link rel="apple-touch-icon" sizes="80x80" href="/favicons/icon-80.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/favicons/icon-114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/favicons/icon-120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/favicons/icon-144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/favicons/icon-152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/icon-180.png">
    <link rel="icon" type="image/png" href="/favicons/icon-32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicons/icon-192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicons/icon-96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicons/icon-16.png" sizes="16x16">
    <link rel="manifest" href="/favicons/manifest.json">
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#34495E">
    <link rel="icon" sizes="any" type="image/svg+xml" href="/favicons/icon.svg">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="msapplication-TileColor" content="#34495E">
    <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png">
    <meta name="msapplication-config" content="/favicons/browserconfig.xml">
    <meta name="theme-color" content="#ECF0F1">
    <meta name="msapplication-navbutton-color" content="#34495E" />
    
    ${ preconnect }
    
    ${ shouldLoadRaygun ? raygunClient : '' }
    <style>
      .hero {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f7fa;
      }
      noscript .hero {
        background-image: linear-gradient(141deg, #ffbd3d 0%, #fce473 71%, #fffe8a 100%);
        backgound-color: #fce473;
        color: rgba(0, 0, 0, 0.5);
        z-index: 2;
      }
      .hero h1 {
        text-align: center;
        margin-top: 45vh;
        font-size: 52px;
        line-height: 1.125;
        font-weight: 300;
      }
      body {
        color: #69707a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <section class="hero">
        <h1>Loading…</h1>
      </section>
      <noscript>
        <section class="hero">
          <h1>${ title } requires JavaScript and a modern browser to function correctly</h1>
        </section>
      </noscript>
    </div>
    ${ analytics }
    <script>
      SUPPORTED_BROWSERS = ${ SUPPORTED_BROWSERS };
    </script>
    ${ scripts }
    ${ loadCSS }
    ${ shouldLoadRaygun ? raygunInit : '' }
  </body>
</html>`;

      if ('production' === process.env.NODE_ENV) {
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
          minifyCSS: true
        });
      }
    }

    res.set('Cache-Control', 'max-age=60');

    res.send(html);
  });
};