
import {ADD_ORDER, EDIT_ORDER, REMOVE_ORDER, FETCH_ORDERS } from '../actions/orders.action';

const initialState = { orders:null };

const OrdersReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case FETCH_ORDERS:
            newState = {
                ...state,
                orders:payload.orders
            };
            break;

        case ADD_ORDER:
            newState = {
                ...state,
                orders:{...state.orders, [payload.orderId]: payload.order}
            }
            break;
        
        case EDIT_ORDER:
            newState = {
                ...state,
                orders:{
                    ...state.orders,
                    [payload.orderId]: payload.updatedOrder
                }
            }
            break;

        case REMOVE_ORDER:
            const temp = {...state.orders};
            delete temp[payload.orderId];
            newState = {
                ...state,
                orders:temp
            }
            break;

        default: newState = state;
    }

    return newState;
};

export default OrdersReducer;