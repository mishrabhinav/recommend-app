import { fromJS } from 'immutable';
import { fork, takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_DIRECTIONS_REQUEST } from './constants';
import {fetchDirectionsError, fetchDirectionsRequest, fetchDirectionsSuccess, toggleDirectionsLoading} from './actions';

// Listener
export function * fetchDirectionsListener(request) {
  yield takeLatest(FETCH_DIRECTIONS_REQUEST, fetchDirectionsHandler)
}

// Handler
export function * fetchDirectionsHandler() {
  const loading = yield select(state => state.getIn(['app', 'directions', 'loading']))

  if (loading) {
    return
  }

  yield put(toggleDirectionsLoading());

  try {
    const from_coord = yield select(state => state.getIn(['app', 'start']).toJS());
    const to_coord = yield select(state => state.getIn(['app', 'destination']).toJS());
    const response = yield call(fetchDirections, { from_coord, to_coord })

    console.log(response.data);
    yield put(fetchDirectionsSuccess(fromJS(response.data)));
  } catch (error) {
    yield put(fetchDirectionsError(fromJS(error)));
  }
}

// API Request

function fetchDirections({ from_coord, to_coord }) {
  return axios({
    url: `http://localhost:5000?lat=${from_coord.lat}&lng=${from_coord.lng}`,
    method: 'GET'
  });
}

// Root Saga

export default function * rootSaga () {
  yield fork(fetchDirectionsListener);
}
