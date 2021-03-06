import {PURGE} from 'redux-persist';

import {SET_DIRECTION_MODE, SET_USERNAME, TOGGLE_BIKE, TOGGLE_CAR, TOGGLE_TRANSIT, TOGGLE_WALK} from "./constants";

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  }
}

export function setDirectionMode(mode) {
  return {
    type: SET_DIRECTION_MODE,
    mode
  }
}

export function toggleBike() {
  return {
    type: TOGGLE_BIKE
  }
}

export function toggleCar() {
  return {
    type: TOGGLE_CAR
  }
}

export function toggleWalk() {
  return {
    type: TOGGLE_WALK
  }
}

export function toggleTransit() {
  return {
    type: TOGGLE_TRANSIT
  }
}

export function logout() {
  return {
    type: PURGE
  }
}
