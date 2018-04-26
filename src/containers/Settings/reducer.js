import { fromJS } from 'immutable';
import {
  SET_USERNAME,
  TOGGLE_CAR,
  TOGGLE_BIKE,
  TOGGLE_TRANSIT,
  TOGGLE_WALK
} from "./constants";

export const initialState = fromJS({
  bike: {
    show: true,
    limits: []
  },
  car: {
    show: true,
    limits: []
  },
  walk: {
    show: true,
    limits: []
  },
  transit: {
    show: true,
    limits: []
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
      return toggleShow(state, 'bike');

    case TOGGLE_WALK:
      return toggleShow(state, 'walk');

    case TOGGLE_CAR:
      return toggleShow(state, 'car');

    case TOGGLE_TRANSIT:
      return toggleShow(state, 'transit');

    default:
      return state
  }
}
