import api from "../shared/utils/api";

import {
  ADD_DELIVERY,
  DELIVERY_OVERVIEW,
} from './types';

import { setAlert } from "./alert";

export const addRoute = (data, navigate) => async (dispatch) => {
  api.post(
    '/delivery/new',
    data
  ).then(res => {
    dispatch({
      type: ADD_DELIVERY,
      payload: res.data
    });
    navigate('/delivery/overview');
  }).catch(err => {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  })
}

export const getOverview = () => async (dispatch) => {
  api.post(
    '/delivery/overview'
  ).then(res => {
    dispatch({
      type: DELIVERY_OVERVIEW,
      payload: res.data
    });
  }).catch(err => {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  })
}