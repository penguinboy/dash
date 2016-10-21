import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

// Reducers
import * as rootReducer from './reducers';

const buildStore = (history) => {
  const reactHistory = history || createMemoryHistory();
  const reducer = combineReducers({
    ...rootReducer,
    routing: routerReducer,
  });

  const middleware = [
    thunk,
    routerMiddleware(reactHistory),
  ];

  if (process.env.NODE_ENV !== 'production' && process.env.BABEL_ENV !== 'test') {
    middleware.push(logger());
  }

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middleware),
      process.env.NODE_ENV !== 'production' && window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
};

export default buildStore;