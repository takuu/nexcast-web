/* eslint-env browser */
/* global process */
// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import AppContainer from 'react-hot-loader/lib/AppContainer'
const theme = createMuiTheme();

import App from './Root';
if (process.env.BROWSER) require('./styles/global.css');

import { Route, HashRouter, StaticRouter ,BrowserRouter, Switch } from 'react-router-dom';


const history = {};
// var injectTapEventPlugin = require('react-tap-event-plugin');
// injectTapEventPlugin();
const render = App => ReactDOM.hydrate(
  <AppContainer>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter context={{test: 'hello'}} ><App /></BrowserRouter>
    </MuiThemeProvider>
  </AppContainer>,
  document.getElementById('app')
);


if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./Root.js', () => {
    const App = require('./Root').default
    render(App);
  })
}

render(App)