import { fromJS } from 'immutable';
import {
  SET_LOCATION,
  START_LOCATION,
  DESTINATION,

  FETCH_DIRECTIONS_SUCCESS,
  FETCH_DIRECTIONS_ERROR,
  TOGGLE_DIRECTIONS_LOADING
} from './constants';

export const initialState = fromJS({
  start: {
    lat: null,
    lng: null
  },
  destination: {
    lat: null,
    lng: null
  },
  current : {
    lat: null,
    lng: null
  },
  directions: {
    loading: false,
    error: null,
    data: null
  }
});

export default function appPageReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      let key = 'current'

      if (action.locationType === START_LOCATION) {
        key = 'start'
      } else if (action.locationType === DESTINATION) {
        key = 'destination'
      }

      return state.set(key, fromJS({ lat: action.lat, lng: action.lng }));

    case FETCH_DIRECTIONS_SUCCESS:
      return state.setIn(['directions', 'data'], action.data);

    case FETCH_DIRECTIONS_ERROR:
      return state.setIn(['directions', 'error'], action.error);

    case TOGGLE_DIRECTIONS_LOADING:
      return state.setIn(['directions', 'loading'], !state.getIn(['directions', 'loading']));

    default:
      return state;
  }
}
