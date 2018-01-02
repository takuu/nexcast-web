import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import Root from '../src/Root'


import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';

import { Route, HashRouter, StaticRouter ,BrowserRouter, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red, indigo, pink } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    accent: pink,
    type: 'light',
  },
});
const context = {
  splitPoints: [], // Create an empty array
};

export default ({ clientStats }) => (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const context = {
    splitPoints: [], // Create an empty array
  };
  // Configure JSS
  const jss = create(preset());
  const generateClassName = createGenerateClassName();

  const app = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={context}>
      <JssProvider registry={sheetsRegistry} jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>

          <Root />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  )
  const chunkNames = flushChunkNames()
  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)
  console.log('STYLESHEETS SERVED', stylesheets)

  res.send(
    `<!doctype html>
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
    
    
            ${styles}
        </head>
      <body>
        <div id="app">${app}</div>
        <style id="jss-server-side">${css}</style>
          ${cssHash}
          ${js}
      </body>
    </html>`
  )
}
