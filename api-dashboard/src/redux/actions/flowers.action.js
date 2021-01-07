
import uniqid from 'uniqid';

// action types
export const UPDATE_OR_CREATE_FLOWER = 'ADD_FLOWER';
export const REMOVE_FLOWER = 'REMOVE_FLOWER';

// actions

/**
 * used to add a new flower 
 * 
 * @param {object} flower
 */
export const addFlower = flower => {
    return {
        type: UPDATE_OR_CREATE_FLOWER,
        payload: {flower, flowerId:uniqid()}
    }
}

/**
 * used to update an existing flower 
 * 
 * @param {object} flower 
 */
export const editFlower = flower => {
    return {
        type: UPDATE_OR_CREATE_FLOWER,
        payload: {flower, flowerId:flower._id}
    }
}

/**
 * used to delete an existing flower 
 * 
 * @param {string} flowerId
 */
export const removeFlower = flowerId => {
    return {
        type: REMOVE_FLOWER,
        payload: {flowerId:flowerId}
    }
}