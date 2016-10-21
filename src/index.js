import React from 'react';
import hashHistory from 'history/lib/createHashHistory';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import createRoutes from './core/createRoutes';
import createHistory from './core/createHistory';
import createStore from './core/createStore';

import App from './app';

const routes = createRoutes(App);
const history = createHistory(hashHistory, routes);
const store = createStore(history);

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('react'));