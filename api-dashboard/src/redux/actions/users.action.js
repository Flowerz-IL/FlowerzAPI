
import uniqid from 'uniqid';

export const UPDATE_OR_CREATE_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

/**
 * used to add a new user 
 * 
 * @param {object} user
 */
export const addUser = user => {
    return {
        type: UPDATE_OR_CREATE_USER,
        payload: {user, userId:uniqid()}
    }
}

/**
 * used to update an existing user 
 * 
 * @param {object} user 
 */
export const editUser = user => {
    return {
        type: UPDATE_OR_CREATE_USER,
        payload: {user, userId:user._id}
    }
}

/**
 * used to delete an existing user 
 * 
 * @param {string} userId
 */
export const removeUser = userId => {
    return {
        type: REMOVE_USER,
        payload: {userId:userId}
    }
}