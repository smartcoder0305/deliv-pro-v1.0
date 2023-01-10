import api from '../shared/utils/api'
import { AUTH_ERROR, REGISTER_FAIL, SEND_CODE, USER_LOADED, CODE_VERIFIED, LOGIN_SUCCESS, SET_PASSWORD, LOGOUT } from './types'
import { setAlert } from "./alert"
import { getOverview } from './delivery';

export const register = (formData, navigate) => async (dispatch) => {
  api.post(
    '/users/signup',
    formData
  ).then(res => {
    dispatch({
      type: SEND_CODE,
      payload: res.data
    })
    navigate('/code');
  }).catch(err => {
    const errors = err.response.data.errors;

    if(errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }

    // dispatch({
    //   type: REGISTER_FAIL
    // })
  })
}

export const verify = (code, navigate) => async (dispatch) => {
  api.post(
    '/users/verify',
    {code}
  ).then(res => {
    dispatch({
      type: CODE_VERIFIED,
      payload: res.data
    })
    dispatch(loadUser());
    navigate('/password');
  }).catch(err => {
    dispatch(setAlert(err.response.data.msg, 'danger'));
  })
}

export const loadUser = () => async (dispatch) => {
  api.get(
    '/users/auth'
  ).then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
    dispatch(getOverview());
  }).catch(err => {
    dispatch({
      type: AUTH_ERROR
    });
  })
};

export const login = (formData, navigate) => async (dispatch) => {
  api.post(
    '/users/login',
    formData
  ).then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  }).catch(err => {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  })
}

export const setpassword = (formData, navigate) => async (dispatch) => {
  api.post(
    '/users/set-password',
    formData
  ).then(res => {
    dispatch({
      type: SET_PASSWORD,
      payload: res.data
    });
    dispatch(loadUser());
    navigate('/delivery/new');
  }).catch(err => {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  })
}

export const logout = () => ({type: LOGOUT});