import {fromJS} from 'immutable';
import {fork, takeLatest, call, put, select} from 'redux-saga/effects';
import axios from 'axios';

import {FETCH_DIRECTIONS_REQUEST, SELECT_DIRECTION_REQUEST} from './constants';
import {
  fetchDirectionsError,
  fetchDirectionsSuccess,
  toggleDirectionsLoading,

  selectDirectionError,
  selectDirectionSuccess,
  toggleSelectLoading
} from './actions';
import {accessTokenSelector, tokenTypeSelector} from '../../selector';

// Listener
export function* fetchDirectionsListener() {
  yield takeLatest(FETCH_DIRECTIONS_REQUEST, fetchDirectionsHandler);
}

export function* selectDirectionListener() {
  yield takeLatest(SELECT_DIRECTION_REQUEST, selectDirectionHandler);
}

// Handler
export function* fetchDirectionsHandler() {
  const loading = yield select(state => state.getIn(['app', 'directions', 'loading']));

  if (loading) {
    return
  }

  yield put(toggleDirectionsLoading());

  const accessToken = yield select(accessTokenSelector);
  const tokenType = yield select(tokenTypeSelector);

  try {
    const from = yield select(state => state.getIn(['app', 'start']).toJS());
    const to = yield select(state => state.getIn(['app', 'destination']).toJS());
    const group = yield select(state => state.getIn(['app', 'group']));
    console.log(group);
    const response = yield call(fetchDirections, {from, to, group, accessToken, tokenType});
    console.log(response);

    yield put(fetchDirectionsSuccess(fromJS(response.data)));
  } catch (error) {
    yield put(fetchDirectionsError(fromJS(error)));
  } finally {
    yield put(toggleDirectionsLoading());
  }
}

export function* selectDirectionHandler(request) {
  const loading = yield select(state => state.getIn(['app', 'selected', 'loading']));

  if (loading) {
    return
  }

  yield put(toggleSelectLoading());

  const accessToken = yield select(accessTokenSelector);
  const tokenType = yield select(tokenTypeSelector);

  try {
    const {recommendation_id, select} = request;
    yield call(selectDirection, {recommendation_id, select, accessToken, tokenType});
    yield put(selectDirectionSuccess(fromJS(request.id)));
  } catch (error) {
    yield put(selectDirectionError(fromJS(error)));
  } finally {
    yield put(toggleSelectLoading());
  }
}

// API Request

function fetchDirections({from, to, group, accessToken, tokenType}) {
  axios({
    url: `http://localhost:5000/api/user`,
    method: 'GET',
    headers: {
      'Authorization': `${tokenType} ${accessToken}`
    }
  });

  return axios({
    url: `http://localhost:5000/api/retrieve?to=${to.lat},${to.lng}&from=${from.lat},${from.lng}&group=${group}`,
    method: 'GET',
    headers: {
      'Authorization': `${tokenType} ${accessToken}`
    }
  });
}

function selectDirection({recommendation_id, select, accessToken, tokenType}) {
  return axios({
    url: `http://localhost:5000/api/select`,
    method: 'POST',
    data: {
      recommendation_id,
      select
    },
    headers: {
      'Authorization': `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
}

// Root Saga

export default function* rootSaga() {
  yield fork(fetchDirectionsListener);
  yield fork(selectDirectionListener);
}
