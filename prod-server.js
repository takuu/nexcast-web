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
import { Route, HashRouter, StaticRouter ,BrowserRouter, Switch } from 'react-router-dom';
import proxyMiddleware from 'http-proxy-middleware';
import fs from 'fs';
import { Provider } from 'react-redux';
import { createMemoryHistory, useQueries } from 'history';
import compression from 'compression';
import _ from 'lodash';
import httpProxy from 'http-proxy';
import { Router } from 'react-router';
import ReactDOM from 'react-dom';


import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { green, red } from 'material-ui/colors';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';

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


function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  const context = {
    splitPoints: [], // Create an empty array
  };

  // Configure JSS
  const jss = create(preset());
  // const jss = create({ plugins: [...preset().plugins, rtl()] }); // in-case you're supporting rtl
  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <JssProvider registry={sheetsRegistry} jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Root />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  )

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
}

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
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
        <div id="app">${html}</div>
        <style id="jss-server-side">${css}</style>
      </body>
    </html>
  `;
}


app.use(handleRender);

/*
app.get('/', (req, res, next) => {


  // fs.readFile(path.join(__dirname, 'build', 'index.html'), {
  //   encoding: 'utf-8'
  // }, (err, source) => {
  //   if (err) return next(err);
  //
  //   const template = _.template(source);
  //
  //   res.write(template({ html: '', initialState: 'undefined' }));
  //   res.end();
  // });



});
*/
/*

app.get('*', (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log('app.get * : ', fullUrl);

  const context = {
    splitPoints: [], // Create an empty array
  };

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
  const stream = renderToNodeStream(<StaticRouter location={req.url} context={context}><Root /></StaticRouter>);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write("</div></body></html>");
    res.end();
  });


});
*/

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})
