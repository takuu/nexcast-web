/* eslint-env browser */
/* global process */
import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';
//import HashHistory from 'react-router/lib/HashHistory';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Root from './Root';
// import './styles/global.css';
if (process.env.BROWSER) require('./styles/global.css');
// import withStyles from './decorators/withStyles';


const App = () => (

  <Root />

);



const history = {};
// var injectTapEventPlugin = require('react-tap-event-plugin');
// injectTapEventPlugin();
ReactDOM.render(
  <Root />,
  document.getElementById('app')
);