import {
  AUTH_ERROR,
  CODE_VERIFIED,
  SEND_CODE,
  USER_LOADED,
  LOGIN_SUCCESS,
  SET_PASSWORD,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  loading: true,
}

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case SEND_CODE:
    case CODE_VERIFIED:
    case SET_PASSWORD:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      }
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false
      }
    default:
      return state;
  }
}

export default authReducer;