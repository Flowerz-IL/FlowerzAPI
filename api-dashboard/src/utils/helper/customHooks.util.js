
import {useSelector} from 'react-redux';

const objectToArray = object => Object.keys(object).map(key => object[key]);

/**
 * used to fetch state from redux store.
 * 
 * @param {function} selectorCallBack as you would in a regular useSelector state
 * @returns [data as an object, data as an array]
 */
export const useSelectorAsAnArray = (selectorCallBack) => {
    const data = useSelector(selectorCallBack);
    return [data, objectToArray(data)];
};