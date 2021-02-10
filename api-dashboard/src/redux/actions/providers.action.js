
import * as API_SDK from '../../utils/helper/API_SDK.util';

export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';
export const ADD_PROVIDER = 'ADD_PROVIDER';
export const EDIT_PROVIDER = 'EDIT_PROVIDER';
export const REMOVE_PROVIDER = 'REMOVE_PROVIDER';

/**
 * Used to fetch the provider from the DB
 */
export const fetchProviders = () => {
    return async dispatch => {
        try{
            const providers = await API_SDK.get(API_SDK.API_ROUTES.PROVIDER);

            dispatch({ 
                type: FETCH_PROVIDERS,
                payload:{providers}
            });
        } catch (err) { console.log(err);}
    };
};

/**
 * Used to add a new provider 
 * 
 * @param {object} provider
 */
export const addProvider = provider => {
    return async dispatch => {
        try{
            const {createdItemId, savedItem} = await API_SDK.post(API_SDK.API_ROUTES.PROVIDER, provider);
            dispatch({
                type: ADD_PROVIDER,
                payload: {provider: savedItem, providerId:createdItemId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to update an existing provider 
 * 
 * @param {object} providerChange 
 */
export const editProvider = (providerChange, providerId) => {
    return async dispatch => {
        try{
            const {updatedItem} = await API_SDK.patch(`${API_SDK.API_ROUTES.PROVIDER}/${providerId}`, providerChange);
            dispatch({
                type: EDIT_PROVIDER,
                payload: {updatedProvider:updatedItem, providerId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to delete an existing provider 
 * 
 * @param {string} providerId
 */
export const removeProvider = providerId => {
    return async dispatch => {
        try{
            const provider = await API_SDK.deleteReq(`${API_SDK.API_ROUTES.PROVIDER_SPECIFIC}/${providerId}`);
            dispatch({
                type: REMOVE_PROVIDER,
                payload: {provider, providerId}
            });
        } catch (err) { console.log(err);}
    }
};