const express = require('express')
const webpack = require('webpack') // aliased to webpack-universal
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfig = require('../webpack/client.dev')
const serverConfig = require('../webpack/server.dev')
const compression = require('compression');
const httpProxy = require('http-proxy');
const cookieParser = require('cookie-parser');

const app = express();

const compiler = webpack([clientConfig, serverConfig])
const clientCompiler = compiler.compilers[0]
const publicPath = clientConfig.output.publicPath
const options = { publicPath, stats: { colors: true } }

app.use(compression());
app.use(cookieParser());



var apiProxy = new httpProxy.createProxyServer();
app.get('/api/v1*', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('REDIRECT * app.get /v1/api : ', fullUrl);
  apiProxy.web(req, res, { target: process.env.API_URL || 'http://localhost:1337' }, function(e) {
    console.log('process.env.API_URL: ', process.env.API_URL);
    console.log('what??!  error on proxy...', e);
  });
});



app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(compiler));




app.listen(3000, () => {
  console.log('Listening @ http://localhost:3000')
})
