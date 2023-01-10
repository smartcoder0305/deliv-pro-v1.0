import api from "../shared/utils/api";
import { SEARCH_FROMTO, SEARCH_SHIPMENTDETAIL, SERACH_RESULT } from './types';

export const setFromTo = (fromTo) => (dispatch) => {
    dispatch({
        type: SEARCH_FROMTO,
        payload: fromTo
    });
}

export const setShipmentDetail = (shipmentDetail) => (dispatch) => {
    dispatch({
        type: SEARCH_SHIPMENTDETAIL,
        payload: shipmentDetail
    })
}

export const searchDeliveries = (searchDetail) => (dispatch) => {
    api.post('/delivery/search', {...searchDetail}
    ).then(res => {
        dispatch({
            type: SERACH_RESULT,
            payload: res.data
        })
    }).catch(err => {
        console.log(err.data);
    });
}