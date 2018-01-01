import 'babel-polyfill';
import React from 'react';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';


import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import routes from './routes';
import routes from './routes';
import configureStore from './lib/configureStore';



const store = configureStore();
export default class Root extends React.Component {
  render() {
    return (
          <Provider store={store}>

              {renderRoutes(routes)}
          </Provider>
    );
  }
}
