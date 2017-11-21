/* eslint-env node */
import webpack from 'webpack';
import config from './webpack.config';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware from 'http-proxy-middleware';
import winston from 'winston';
winston.add(winston.transports.File, { filename: 'somefile.log' });
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const env = process.env.NODE_ENV || 'development';
const bundler = webpack(config);

var proxy = proxyMiddleware(['/api', '/logins'], {
  target: 'http://localhost:1337',
  changeOrigin: false   // for vhosted sites, changes host header to match to target's host
});

// We want to create multiple browserSync instances
var appBrowserSync = browserSync.create('app');

appBrowserSync.init({
  server: {
    baseDir: '.',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }
      }),
      proxy,

      webpackHotMiddleware(bundler),

      (req, res, next) => {

        console.log('req.url :', req.url);

        // This is here because of the hashtags
        //if (req.url !== '/') { return next(); }
        var isAllowedAsset = _checkIfAllowedAsset(req.originalUrl);
        console.log('isAsset?: ', isAllowedAsset);
        if(isAllowedAsset) return next();


        fs.readFile(path.join(__dirname, 'app', 'template.html'), {
          encoding: 'utf-8'
        }, (err, source) => {
          if (err) return next(err);

          const template = _.template(source);

          res.write(template({ html: '', initialState: 'undefined', env }));
          res.end();
        });

        function _checkIfAllowedAsset(url) {
          var ALLOWED_TYPES = ['png', 'jpeg', 'css', 'js', 'jpg', 'gif'];
          var path = url.split('.');
          var fileType = path[1] && path[1].split('?')[0];

          var index = ALLOWED_TYPES.indexOf(fileType);
          return index >=0;

        }
      }

    ]
  },

  files: [
    'src/template.html'
  ]
});
