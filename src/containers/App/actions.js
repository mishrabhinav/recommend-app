import {
  SET_LOCATION,
  SET_GROUP,

  FETCH_DIRECTIONS_ERROR,
  FETCH_DIRECTIONS_REQUEST,
  FETCH_DIRECTIONS_SUCCESS,
  TOGGLE_DIRECTIONS_LOADING,

  SELECT_DIRECTION_ERROR,
  SELECT_DIRECTION_REQUEST,
  SELECT_DIRECTION_SUCCESS,
  TOGGLE_SELECT_LOADING
} from './constants';

export function setLocation(lat, lng, locationType) {
  return {
    type: SET_LOCATION,
    lat,
    lng,
    locationType
  };
}

export function setGroup(group) {
  return {
    type: SET_GROUP,
    group
  }
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

export function selectDirectionRequest(recommendation_id, select, group) {
  return {
    type: SELECT_DIRECTION_REQUEST,
    recommendation_id,
    select,
    group
  }
}

export function selectDirectionError(error) {
  return {
    type: SELECT_DIRECTION_ERROR,
    error
  }
}

export function selectDirectionSuccess(id) {
  return {
    type: SELECT_DIRECTION_SUCCESS,
    id
  }
}

export function toggleSelectLoading() {
  return {
    type: TOGGLE_SELECT_LOADING
  }
}
