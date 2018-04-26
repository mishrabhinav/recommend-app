import { combineReducers } from 'redux-immutable';

import appReducer from './containers/App/reducer';
import settingReducer from './containers/Settings/reducer';
import historyReducer from './containers/History/reducer';
import authReducer from './containers/Login/reducer';

export default function createReducer (asyncReducers) {
  return combineReducers({
    auth: authReducer,
    app: appReducer,
    settings: settingReducer,
    history: historyReducer,
    ...asyncReducers
  });
}
