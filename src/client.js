/* eslint-env browser */
/* global process */
import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
if (process.env.BROWSER) require('./styles/global.css');


const history = {};
// var injectTapEventPlugin = require('react-tap-event-plugin');
// injectTapEventPlugin();
ReactDOM.hydrate(
  <Root />,
  document.getElementById('app')
);