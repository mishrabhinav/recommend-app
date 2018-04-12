import {
  SET_LOCATION,

  FETCH_DIRECTIONS_REQUEST,
  FETCH_DIRECTIONS_ERROR,
  FETCH_DIRECTIONS_SUCCESS,
  TOGGLE_DIRECTIONS_LOADING,
} from './constants';

export function setLocation(lat, lng, locationType) {
  return {
    type: SET_LOCATION,
    lat,
    lng,
    locationType
  };
}

export function fetchDirectionsRequest() {
  return {
    type: FETCH_DIRECTIONS_REQUEST
  }
}

export function fetchDirectionsError(error) {
  return {
    type: FETCH_DIRECTIONS_ERROR,
    error
  }
}

export function fetchDirectionsSuccess(data) {
  return {
    type: FETCH_DIRECTIONS_SUCCESS,
    data
  }
}

export function toggleDirectionsLoading() {
  return {
    type: TOGGLE_DIRECTIONS_LOADING
  }
}
