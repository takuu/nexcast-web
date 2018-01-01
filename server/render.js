import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import Root from '../src/Root'

import { Route, HashRouter, StaticRouter ,BrowserRouter, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';


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

export default ({ clientStats }) => (req, res) => {
  const app = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={context}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Root />
      </MuiThemeProvider>
    </StaticRouter>
  )
  const chunkNames = flushChunkNames()

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
          ${cssHash}
          ${js}
      </body>
    </html>`
  )
}
