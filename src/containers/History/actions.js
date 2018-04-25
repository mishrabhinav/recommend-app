import {
  FETCH_HISTORY_REQUEST,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS,
  TOGGLE_HISTORY_LOADING
} from "./constants";

export function fetchHistoryRequest() {
  return {
    type: FETCH_HISTORY_REQUEST
  };
}

export function fetchHistorySuccess(data) {
  return {
    type: FETCH_HISTORY_SUCCESS,
    data
  };
}

export function fetchHistoryError(error) {
  return {
    type: FETCH_HISTORY_ERROR,
    error
  };
}

export function toggleHistoryLoading() {
  return {
    type: TOGGLE_HISTORY_LOADING
  };
}