import { fromJS } from 'immutable';
import {
  SET_USERNAME,
  TOGGLE_CAR,
  TOGGLE_BIKE,
  TOGGLE_TRANSIT,
  TOGGLE_WALK
} from "./constants";

export const initialState = fromJS({
  distance: [3000, 6000],
  duration: [1200, 1800],
  WALKING: {
    show: true,
    distance: [1000, 2500],
    duration: [600, 1200]
  },
  BICYCLING: {
    show: true,
    distance: [2000, 4000],
    duration: [600, 1200]
  },
  DRIVING: {
    show: true,
    distance: [3000, 6000],
    duration: [600, 1200]
  },
  TRANSIT: {
    show: true,
    distance: [3000, 6000],
    duration: [600, 1200]
  }
});

function toggleShow(state, key) {
  return state.setIn([key, 'show'], !state.getIn([key, 'show']));
}

export default function settingsPageReducer (state=initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return state.set('username', action.username);

    case TOGGLE_BIKE:
      return toggleShow(state, 'BICYCLING');

    case TOGGLE_WALK:
      return toggleShow(state, 'WALKING');

    case TOGGLE_CAR:
      return toggleShow(state, 'DRIVING');

    case TOGGLE_TRANSIT:
      return toggleShow(state, 'TRANSIT');

    default:
      return state
  }
}
