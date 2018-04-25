import {fromJS} from 'immutable';
import {
  TOGGLE_HISTORY_LOADING,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS
} from "./constants";

export const initialState = fromJS({
  loading: false,
  error: null,
  data: []
});

export default function historyPageReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_HISTORY_LOADING:
      return state.set('loading', !state.get('loading'));

    case FETCH_HISTORY_SUCCESS:
      return state.set('data', action.data.get('history'));

    case FETCH_HISTORY_ERROR:
      return state.set('errror', action.error);

    default:
      return state;
  }
}
