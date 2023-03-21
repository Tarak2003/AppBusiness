import { SET_ORDER } from '../actions/order';

const initialState = {
    order: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            return {
                order: action.order
            }
    }
    return state;
};