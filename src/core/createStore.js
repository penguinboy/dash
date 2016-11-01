import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

// Reducers
import * as rootReducer from './reducers';

console.log('Reducers', { ...rootReducer });

const buildStore = (history) => {
  const reactHistory = history || createMemoryHistory();
  const reducer = combineReducers({
    ...rootReducer,
    routing: routerReducer,
  });

  const middleware = [
    thunk,
    routerMiddleware(reactHistory),
    logger()
  ];
  
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middleware),
      window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
};

export default buildStore;
