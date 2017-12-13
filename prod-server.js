import React from 'react';
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


var app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(__dirname + '/build'));

app.use('/js',express.static(path.join(__dirname, 'build/js')));
app.use('/css',express.static(path.join(__dirname, 'build/css')));


console.log('prod-server NODE_ENV: ', process.env.NODE_ENV);


var apiProxy = new httpProxy.createProxyServer();
app.get('/api/v1*', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('app.get /api : ', fullUrl);
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
  fs.readFile(path.join(__dirname, 'build', 'index.html'), {
    encoding: 'utf-8'
  }, (err, source) => {
    if (err) return next(err);

    const template = _.template(source);

    res.write(template({ html: '', initialState: 'undefined' }));
    res.end();
  });
});

app.get('*', (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('app.get * : ', fullUrl);
  res.sendFile(path.join(__dirname , 'build', 'index.html'));
});


function renderPage(appHtml, initialState) {
  return `
    <!doctype html public="storage">
    <html>
      <head>
      <meta charset=utf-8/>
    <title>Nexcast</title>
  </head>
    <title>Nexcast</title>
   
    <div id="app">${appHtml}</div>
    <script>var __INITIAL_STATE__ =  "${initialState}";</script>
    <script src="/app.js"></script>
   `
}

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})
