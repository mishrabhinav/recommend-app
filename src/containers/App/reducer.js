import { fromJS } from 'immutable';
import {
  SET_LOCATION,
  SET_GROUP,
  START_LOCATION,
  DESTINATION,

  FETCH_DIRECTIONS_SUCCESS,
  FETCH_DIRECTIONS_ERROR,
  TOGGLE_DIRECTIONS_LOADING,

  SELECT_DIRECTION_SUCCESS,
  SELECT_DIRECTION_ERROR,
  TOGGLE_SELECT_LOADING
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
  group: '',
  current : {
    lat: null,
    lng: null
  },
  directions: {
    loading: false,
    error: null,
    data: null
  },
  selected: {
    id: null,
    error: null,
    loading: false
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

    case SET_GROUP:
      return state.set('group', action.group);

    case FETCH_DIRECTIONS_SUCCESS:
      return state.setIn(['directions', 'data'], action.data);

    case FETCH_DIRECTIONS_ERROR:
      return state.setIn(['directions', 'error'], action.error);

    case TOGGLE_DIRECTIONS_LOADING:
      return state.setIn(['directions', 'loading'], !state.getIn(['directions', 'loading']));

    case SELECT_DIRECTION_SUCCESS:
      return state.setIn(['selected', 'id'], action.id);

    case SELECT_DIRECTION_ERROR:
      return state.setIn(['selected', 'error'], action.error);

    case TOGGLE_SELECT_LOADING:
      return state.setIn(['selected', 'loading'], !state.getIn(['selected', 'loading']));

    default:
      return state;
  }
}
