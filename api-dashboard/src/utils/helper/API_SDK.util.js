
import axios from 'axios';

const SDKInstance = axios.create({baseURL: 'http://localhost:8080/api'});

/**
 * Used to send get request to the api
 * 
 * @param {string} route api route
 */
export const get = route => SDKInstance.get(route)
    .then(res => res.data.reduce((prev, current) => ({...prev, [current._id]: current}) ,{}));

/**
 * Used to send post request to the api
 * 
 * @param {string} route 
 * @param {object} objectToSend 
 */
export const post = (route, objectToSend) => SDKInstance.post(route, objectToSend)
    .then(res => res.data);

/**
 * Used to send patch request to the api
 * 
 * @param {string} route 
 * @param {object} objectToSend 
 */
export const patch = (route, objectToSend) => SDKInstance.patch(route, objectToSend)
    .then(res => res.data);

/**
 * Used to send delete request to the api
 * 
 * @param {string} route 
 */
export const deleteReq = route => SDKInstance.delete(route)
    .then(res => res.data);

/**
 * Routes options
 */
export const API_ROUTES = {
    FLOWER: '/flowers',
    FLOWER_BOUQUET: '/flower-bouquets',
    USER: '/users',
    USER_SPECIFIC: '/users/specific',
    SIGN_IN: '/users/sign-in',
    USER_SIGN_UP: '/users/sign-up',
    PROVIDER: '/providers',
    PROVIDER_SPECIFIC: '/providers/specific',
    PROVIDER_SIGN_UP: '/providers/sign-up'
};