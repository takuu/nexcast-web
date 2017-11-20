import 'babel-core/register';
import 'babel-polyfill';
import React from 'react';
import { Router } from 'react-router';
import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import cookie from './utils/cookie';
// import routes from './routes';
import routesNew from './routes/routesNew';
import { routerStateChange } from './actions/router';
import { createRedux } from './utils/redux';
import { canUseDOM } from 'exenv';


console.log('initial: ', window.__INITIAL_STATE__);

const store = createRedux((process.env.NODE_ENV === 'production')
  ? JSON.parse(decodeURIComponent(window.__INITIAL_STATE__))
  : (canUseDOM) ? { auth: { token: cookie.get('token') || '' } } : {});


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/*            {routesNew.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}*/}
            {/*{routesNew}*/}
            {renderRoutes(routesNew)}

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
