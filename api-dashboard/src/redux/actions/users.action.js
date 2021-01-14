
import * as API_SDK from '../../utils/helper/API_SDK.util';

export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USERS';
export const EDIT_USER = 'EDIT_USERS';
export const REMOVE_USER = 'REMOVE_USERS';

/**
 * Used to fetch the users from the DB
 */
export const fetchUsers = () => {
    return async dispatch => {
        try{
            const users = await API_SDK.get(API_SDK.API_ROUTES.USER);
            dispatch({ 
                type: FETCH_USERS,
                payload:{users}
            });
        } catch (err) { console.log(err);}
    };
};

/**
 * Used to add a new user 
 * 
 * @param {object} user
 */
export const addUser = user => {
    return async dispatch => {
        try{
            const {information} = await API_SDK.post(API_SDK.API_ROUTES.USER_SIGN_UP, user);
            dispatch({
                type: ADD_USER,
                payload: {user: {_id:information._id, ...user}, userId:information._id}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to update an existing user 
 * 
 * @param {object} userChange 
 */
export const editUser = (userChange, userId) => {
    return async dispatch => {
        try{
            const {updatedUser} = await API_SDK.patch(`${API_SDK.API_ROUTES.USER_SPECIFIC}/${userId}`, userChange);
            dispatch({
                type: EDIT_USER,
                payload: {updatedUser, userId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to delete an existing user 
 * 
 * @param {string} userId
 */
export const removeUser = userId => {
    return async dispatch => {
        try{
            await API_SDK.deleteReq(`${API_SDK.API_ROUTES.USER_SPECIFIC}/${userId}`);
            dispatch({
                type: REMOVE_USER,
                payload: {userId}
            });
        } catch (err) { console.log(err);}
    }
};