import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import { Router } from 'react-router';
import { Route, HashRouter, StaticRouter ,BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import routes from './routes';
import routes from './routes';
import configureStore from './lib/configureStore';



const theme = createMuiTheme();
const store = configureStore();
export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter context={{test: 'hello'}} >
          <MuiThemeProvider theme={theme}>
            {renderRoutes(routes)}
          </MuiThemeProvider>
        </BrowserRouter >
      </Provider>
    );
  }
}
