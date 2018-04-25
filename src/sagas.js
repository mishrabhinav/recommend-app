import { fork } from 'redux-saga/effects';

import appSaga from './containers/App/sagas';
import historySaga from './containers/History/sagas';

export default function * rootSaga () {
  yield fork(appSaga);
  yield fork(historySaga);
}
