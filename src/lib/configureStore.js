import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import reducers from '../reducers/index';

export default function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(thunk, promiseMiddleware(), loadingBarMiddleware()));
}