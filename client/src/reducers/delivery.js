import { ADD_DELIVERY, DELIVERY_OVERVIEW } from "../actions/types";

const initialState = {
    deliveries: []
};

const delivrouteReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case ADD_DELIVERY:
            return {
                ...state,
                deliveries: [
                    ...state.deliveries,
                    payload
                ]
            }
        case DELIVERY_OVERVIEW:
            return {
                ...state,
                deliveries: payload
            }
        default:
            return state;
    }
}

export default delivrouteReducer;