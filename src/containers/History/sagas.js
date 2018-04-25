import {fromJS} from 'immutable';
import {fork, takeLatest, call, put, select} from 'redux-saga/effects';
import axios from 'axios';

import {FETCH_HISTORY_REQUEST} from './constants';
import {
  fetchHistoryError,
  fetchHistorySuccess,
  toggleHistoryLoading,
} from './actions';

// Listener
export function* fetchHistoryListener() {
  yield takeLatest(FETCH_HISTORY_REQUEST, fetchHistoryHandler);
}

// Handler
export function* fetchHistoryHandler() {
  const loading = yield select(state => state.getIn(['history', 'loading']));

  if (loading) {
    return
  }

  yield put(toggleHistoryLoading());

  try {
    const response = yield call(fetchHistory);

    yield put(fetchHistorySuccess(fromJS(response.data)));
  } catch (error) {
    yield put(fetchHistoryError(fromJS(error)));
  } finally {
    yield put(toggleHistoryLoading());
  }
}

// API Request

function fetchHistory() {
  return axios({
    url: `http://localhost:5000/api/history?username=mishrabhinav`,
    method: 'GET'
  });
}

// Root Saga

export default function* rootSaga() {
  yield fork(fetchHistoryListener);
}
