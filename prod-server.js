import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import cookieParser from 'cookie-parser';
import express from 'express';
var router = express.Router();
import path from 'path';
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server';
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router';
import proxyMiddleware from 'http-proxy-middleware';
import fs from 'fs';
import { Provider } from 'react-redux';
import { createMemoryHistory, useQueries } from 'history';
import compression from 'compression';
import _ from 'lodash';
import httpProxy from 'http-proxy';
import { Router } from 'react-router';

import Html from './src/Html';
import Root from './src/Root';


var app = express();
app.use(compression());
app.use(cookieParser());


// app.use(express.static(__dirname + '/build'));
app.use('/js',express.static(path.join(__dirname, 'build/js')));
app.use('/css',express.static(path.join(__dirname, 'build/css')));
// app.use('/css',express.static(path.join(__dirname, 'src/styles')));


console.log('prod-server NODE_ENV: ', process.env.NODE_ENV);


var apiProxy = new httpProxy.createProxyServer();
app.get('/api/v1*', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('app.get /v1/api : ', fullUrl);
  apiProxy.web(req, res, { target: process.env.API_URL || 'http://localhost:1337' }, function(e) {
    console.log('process.env.API_URL: ', process.env.API_URL);
    console.log('what??!  error on proxy...', e);
  });
});


function createRoute (history, store) {
  return (
    <Router history={history}>
      {routes}
    </Router>
  );
}
// send all requests to index.html so browserHistory works

app.get('/', (req, res, next) => {

  /*
  fs.readFile(path.join(__dirname, 'build', 'index.html'), {
    encoding: 'utf-8'
  }, (err, source) => {
    if (err) return next(err);

    const template = _.template(source);

    res.write(template({ html: '', initialState: 'undefined' }));
    res.end();
  });
  */


  /*
  renderToNodeStream(
    <Html initialData={JSON.stringify({test: 'hello world'})}>
      <Root />
    </Html>
  ).pipe(res);

*/


  res.write(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nexcast</title>
    
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    
    
            <link rel="stylesheet" href="/css/main.css">
            <script src="/js/app.js"></script>
        </head>
    
        <body>
  `);
  res.write("<div id='app'>");
  const stream = renderToNodeStream(<Root />);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write("</div></body></html>");
    res.end();
  });


});

app.get('*', (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('app.get * : ', fullUrl);

  res.write(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nexcast</title>
    
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    
    
            <link rel="stylesheet" href="/css/global.css">
            <link rel="stylesheet" href="/css/theme.css">
            <script src="/js/app.js"></script>
        </head>
    
        <body>
  `);
  res.write("<div id='app'>");
  const stream = renderToNodeStream(<Root />);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write("</div></body></html>");
    res.end();
  });


});


var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})
