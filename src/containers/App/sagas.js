import { fromJS } from 'immutable';
import { fork, takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_DIRECTIONS_REQUEST, SELECT_DIRECTION_REQUEST } from './constants';
import {
  fetchDirectionsError,
  fetchDirectionsSuccess,
  toggleDirectionsLoading,

  selectDirectionError,
  selectDirectionSuccess,
  toggleSelectLoading
} from './actions';

// Listener
export function * fetchDirectionsListener() {
  yield takeLatest(FETCH_DIRECTIONS_REQUEST, fetchDirectionsHandler);
}

export function * selectDirectionListener() {
  yield takeLatest(SELECT_DIRECTION_REQUEST, selectDirectionHandler);
}

// Handler
export function * fetchDirectionsHandler() {
  const loading = yield select(state => state.getIn(['app', 'directions', 'loading']));

  if (loading) {
    return
  }

  yield put(toggleDirectionsLoading());

  try {
    const from = yield select(state => state.getIn(['app', 'start']).toJS());
    const to = yield select(state => state.getIn(['app', 'destination']).toJS());
    const response = yield call(fetchDirections, { from, to });

    yield put(fetchDirectionsSuccess(fromJS(response.data)));
  } catch (error) {
    yield put(fetchDirectionsError(fromJS(error)));
  } finally {
    yield put(toggleDirectionsLoading());
  }
}

export function * selectDirectionHandler(request) {
  const loading = yield select(state => state.getIn(['app', 'selected', 'loading']));

  if (loading) {
    return
  }

  yield put(toggleSelectLoading());

  try {
    yield call(selectDirection, { recommendation_id: request.recommendation_id, select: request.select });
    yield put(selectDirectionSuccess(fromJS(request.id)));
  } catch (error) {
    yield put(selectDirectionError(fromJS(error)));
  } finally {
    yield put(toggleSelectLoading());
  }
}

// API Request

function fetchDirections({ from, to }) {
  return axios({
    url: `https://localhost:5000/api/retrieve?to=${to.lat},${to.lng}&from=${from.lat},${from.lng}&username=mishrabhinav`,
    method: 'GET'
  });
}

function selectDirection({ recommendation_id, select }) {
  return axios({
    url: `http://localhost:5000/api/select`,
    method: 'POST',
    data: {
      recommendation_id,
      select
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

// Root Saga

export default function * rootSaga () {
  yield fork(fetchDirectionsListener);
  yield fork(selectDirectionListener);
}
