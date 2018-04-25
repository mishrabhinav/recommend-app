import { SET_USERNAME, TOGGLE_BIKE, TOGGLE_CAR, TOGGLE_TRANSIT, TOGGLE_WALK } from "./constants";

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
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
