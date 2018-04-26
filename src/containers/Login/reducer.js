import {fromJS} from 'immutable';
import {PURGE, REHYDRATE} from 'redux-persist';

export const SET_AUTH_TOKENS = 'app/Login/SET_AUTH_TOKENS';
export const SET_AUTH_ERROR = 'app/Login/SET_AUTH_ERROR';

export function setAuthTokens(credentials) {
  return {
    type: SET_AUTH_TOKENS,
    ...credentials
  };
}

export function setAuthError(error) {
  return {
    type: SET_AUTH_ERROR,
    error
  }
}

export const initialState = fromJS({
  accessToken: '',
  idToken: '',
  tokenType: '',
  expiresIn: 0,
  error: {}
});

export default function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKENS:
      return state.set('accessToken', action.accessToken)
        .set('idToken', action.idToken)
        .set('tokenType', action.tokenType)
        .set('expiresIn', action.expiresIn);

    case SET_AUTH_ERROR:
      return state.set('error', action.error);

    case REHYDRATE:
      return action.payload.auth;

    case PURGE:
      return initialState;

    default:
      return state
  }
}
