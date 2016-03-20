var hook = require('css-modules-require-hook');
var sass = require('node-sass');
var path = require('path');

hook({
  extensions: ['.scss'],
  preprocessCss: function (css, filepath) {
    var result =  sass.renderSync({
      data: css,
      includePaths: [ path.resolve(filepath, '..') ]
    });

    return result.css;
  }
});