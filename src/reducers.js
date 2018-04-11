import { combineReducers } from 'redux-immutable';

import appReducer from './containers/App/reducer';

export default function createReducer (asyncReducers) {
  return combineReducers({
    app: appReducer,
    ...asyncReducers
  });
}
