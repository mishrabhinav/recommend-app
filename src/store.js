import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  // Create the store with middlewares
  const middlewares = [
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  // Run root saga
  sagaMiddleware.run(rootSaga);

  // TODO: https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
  store.asyncReducers = {}; // Async reducer registry

  if (module.hot) {
    module.hot.accept(() => {
      const createReducers = require('./reducers').default;
      const nextReducers = createReducers(store.asyncReducers);

      store.replaceReducer(nextReducers);
    });
  }

  if (global.reduxNativeDevTools) {
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = store;
  }

  return store;
}
