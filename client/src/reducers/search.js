import { SEARCH_FROMTO, SEARCH_SHIPMENTDETAIL, SERACH_RESULT } from "../actions/types";

const initialState = {
    from: null,
    to: null,
    detail: {
        weight: null,
        size: {
            length: null,
            width: null,
            height: null,
        }
    },
    results: []
}

const searchReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case SEARCH_FROMTO:
            return {
                ...state,
                ...payload
            };
        case SEARCH_SHIPMENTDETAIL:
            return {
                ...state,
                detail: payload
            };
        case SERACH_RESULT:
            return {
                ...state,
                results: payload
            }
        default:
            return state;
    }
}

export default searchReducer;