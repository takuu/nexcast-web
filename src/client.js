/* eslint-env browser */
/* global process */
import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme();

import Root from './Root';
if (process.env.BROWSER) require('./styles/global.css');

import { Route, HashRouter, StaticRouter ,BrowserRouter, Switch } from 'react-router-dom';


const history = {};
// var injectTapEventPlugin = require('react-tap-event-plugin');
// injectTapEventPlugin();
ReactDOM.hydrate(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter context={{test: 'hello'}} ><Root /></BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('app')
);