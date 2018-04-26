import {fromJS} from 'immutable';
import {fork, takeLatest, call, put, select} from 'redux-saga/effects';
import axios from 'axios';

import {FETCH_HISTORY_REQUEST} from './constants';
import {
  fetchHistoryError,
  fetchHistorySuccess,
  toggleHistoryLoading,
} from './actions';
import {accessTokenSelector, tokenTypeSelector} from '../../selector';

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

  const accessToken = yield select(accessTokenSelector);
  const tokenType = yield select(tokenTypeSelector);

  try {
    const response = yield call(fetchHistory, {accessToken, tokenType});

    yield put(fetchHistorySuccess(fromJS(response.data)));
  } catch (error) {
    yield put(fetchHistoryError(fromJS(error)));
  } finally {
    yield put(toggleHistoryLoading());
  }
}

// API Request

function fetchHistory({accessToken, tokenType}) {
  return axios({
    url: `https://recommend-api.herokuapp.com/api/history`,
    method: 'GET',
    headers: {
      'Authorization': `${tokenType} ${accessToken}`
    }
  });
}

// Root Saga

export default function* rootSaga() {
  yield fork(fetchHistoryListener);
}
