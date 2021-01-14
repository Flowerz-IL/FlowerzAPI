
import * as API_SDK from '../../utils/helper/API_SDK.util';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const EDIT_ORDER = 'EDIT_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';

/**
 * Used to fetch the orders from the DB
 */
export const fetchOrders = () => {
    return async dispatch => {
        try{
            const orders = await API_SDK.get(API_SDK.API_ROUTES.ORDER);
            dispatch({ 
                type: FETCH_ORDERS,
                payload:{orders}
            });
        } catch (err) { console.log(err);}
    };
};

/**
 * Used to add a new order 
 * 
 * @param {object} order
 */
export const addOrder = order => {
    return async dispatch => {
        try{
            const {newOrderId} = await API_SDK.post(API_SDK.API_ROUTES.ORDER, order);
            dispatch({
                type: ADD_ORDER,
                payload: {order: {_id:newOrderId, ...order}, orderId:newOrderId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to update an existing order 
 * 
 * @param {object} orderChange 
 */
export const editOrder = (orderChange, orderId) => {
    return async dispatch => {
        try{
            const updatedOrder = await API_SDK.patch(`${API_SDK.API_ROUTES.ORDER}/${orderId}`, orderChange);
            dispatch({
                type: EDIT_ORDER,
                payload: {updatedOrder, orderId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to delete an existing order 
 * 
 * @param {string} orderId
 */
export const removeOrder = orderId => {
    return async dispatch => {
        try{
            await API_SDK.deleteReq(`${API_SDK.API_ROUTES.ORDER}/${orderId}`);
            dispatch({
                type: REMOVE_ORDER,
                payload: {orderId}
            });
        } catch (err) { console.log(err);}
    }
};