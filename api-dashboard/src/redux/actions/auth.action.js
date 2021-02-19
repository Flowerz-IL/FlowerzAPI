
import * as API_SDK from '../../utils/helper/API_SDK.util';

export const SIGN_IN = 'SIGN_IN';
export const LOG_OUT = 'LOG_OUT';

/**
 * Sign in as an admin or a provider 
 * 
 * @param {object} userCredentials
 */
export const signIn = userCredentials => {
    return async dispatch => {
        const currentUser = await API_SDK.post(API_SDK.API_ROUTES.SIGN_IN, userCredentials);
        if(!['PROVIDER', 'ADMIN'].includes(currentUser.information.userRole))
            throw new Error('wrong email or password');
        dispatch({
            type: SIGN_IN,
            payload: {currentUser}
        }); 
    };
};

/**
 * Sign up as a provider 
 * 
 * @param {object} newUser
 */
export const signUp = newUser => {
    return async dispatch => {
        const currentUser = await API_SDK.post(API_SDK.API_ROUTES.PROVIDER_SIGN_UP, newUser);
        dispatch({
            type: SIGN_IN,
            payload: {currentUser}
        });
    };
};

/**
 * Log out current user
 */
export const logOut = () => ({type:LOG_OUT, payload:{}});