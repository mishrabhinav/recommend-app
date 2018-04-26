import {fromJS} from 'immutable';
import {AsyncStorage} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import {autoRehydrate} from 'redux-persist-immutable';
import createActionBuffer from 'redux-action-buffer';
import {REHYDRATE} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  // Create the store with middlewares
  const middlewares = [
    sagaMiddleware,
    createActionBuffer(REHYDRATE)
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate()
  ];

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    compose(...enhancers)
  );

  // Run root saga
  sagaMiddleware.run(rootSaga);

  store.asyncReducers = {}; // Async reducer registry

  return store;
}
