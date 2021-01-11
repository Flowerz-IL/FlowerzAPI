
import * as API_SDK from '../../utils/helper/API_SDK.util';

export const FETCH_FLOWERS = 'FETCH_FLOWERS';
export const ADD_FLOWER = 'ADD_FLOWER';
export const EDIT_FLOWER = 'EDIT_FLOWER';
export const REMOVE_FLOWER = 'REMOVE_FLOWER';

/**
 * Used to fetch the flowers from the DB
 */
export const fetchFlowers = () => {
    return async dispatch => {
        try{
            const flowers = await API_SDK.get(API_SDK.API_ROUTES.FLOWER);
            dispatch({ 
                type: FETCH_FLOWERS,
                payload:{flowers}
            });
        } catch (err) { console.log(err);}
    };
};

/**
 * Used to add a new flower 
 * 
 * @param {object} flower
 */
export const addFlower = flower => {
    return async dispatch => {
        try{
            const {newFlowerId} = await API_SDK.post(API_SDK.API_ROUTES.FLOWER, flower);
            dispatch({
                type: ADD_FLOWER,
                payload: {flower: {_id:newFlowerId, ...flower}, flowerId:newFlowerId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to update an existing flower 
 * 
 * @param {object} flowerChange 
 */
export const editFlower = (flowerChange, flowerId) => {
    return async dispatch => {
        try{
            const updatedFlower = await API_SDK.patch(`${API_SDK.API_ROUTES.FLOWER}/${flowerId}`, flowerChange);
            dispatch({
                type: EDIT_FLOWER,
                payload: {updatedFlower, flowerId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to delete an existing flower 
 * 
 * @param {string} flowerId
 */
export const removeFlower = flowerId => {
    return async dispatch => {
        try{
            await API_SDK.deleteReq(`${API_SDK.API_ROUTES.FLOWER}/${flowerId}`);
            dispatch({
                type: REMOVE_FLOWER,
                payload: {flowerId}
            });
        } catch (err) { console.log(err);}
    }
};