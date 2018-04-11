import { fromJS } from 'immutable';
import {
  SET_LOCATION,
  START_LOCATION,
  DESTINATION
} from './constants';

export const initialState = fromJS({
  authToken: '',
  authError: '',
  user: '',
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
  }
});

export default function appPageReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      let key = 'current'

      if (action.locationType == START_LOCATION) {
        key = 'start'
      } else if (action.locationType == DESTINATION) {
        key = 'destination'
      }

      return state.set(key, { lat: action.lat, lng: action.lng });

    default:
      return state;
  }
}
