
import * as API_SDK from '../../utils/helper/API_SDK.util';

export const FETCH_FLOWER_BOUQUETS = 'FETCH_FLOWER_BOUQUETS';
export const ADD_FLOWER_BOUQUET = 'ADD_FLOWER_BOUQUET';
export const EDIT_FLOWER_BOUQUET = 'EDIT_FLOWER_BOUQUET';
export const REMOVE_FLOWER_BOUQUET = 'REMOVE_FLOWER_BOUQUET';

/**
 * Used to fetch the flower bouquets from the DB
 */
export const fetchFlowerBouquets = () => {
    return async dispatch => {
        try{
            const flowerBouquets = await API_SDK.get(API_SDK.API_ROUTES.FLOWER_BOUQUET);
            dispatch({ 
                type: FETCH_FLOWER_BOUQUETS,
                payload:{flowerBouquets}
            });
        } catch (err) { console.log(err);}  
    };
};

/**
 * Used to add a new flower bouquet 
 * 
 * @param {object} flowerBouquet
 */
export const addFlowerBouquet = flowerBouquet => {
    return async dispatch => {
        try{
            const {newFlowerBouquet, newFlowerBouquetId} = await API_SDK.post(API_SDK.API_ROUTES.FLOWER_BOUQUET, flowerBouquet);
            console.log(newFlowerBouquet, newFlowerBouquetId);
            dispatch({
                type: ADD_FLOWER_BOUQUET,
                payload: {flowerBouquet: newFlowerBouquet, newFlowerBouquetId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to update an existing flower bouquet  
 * 
 * @param {object} flowerBouquetChange 
 */
export const editFlowerBouquet = (flowerBouquetChange, flowerBouquetId) => {
    return async dispatch => {
        try{
            const {flowerBouquetUpdated} = await API_SDK.patch(`${API_SDK.API_ROUTES.FLOWER_BOUQUET}/${flowerBouquetId}`, flowerBouquetChange);
            dispatch({
                type: EDIT_FLOWER_BOUQUET,
                payload: {flowerBouquet: flowerBouquetUpdated, flowerBouquetId}
            });
        } catch (err) { console.log(err);}
    }
};

/**
 * Used to delete an existing flower bouquet  
 * 
 * @param {string} flowerBouquetId
 */
export const removeFlowerBouquet = flowerBouquetId => {
    return async dispatch => {
        try{
            await API_SDK.deleteReq(`${API_SDK.API_ROUTES.FLOWER_BOUQUET}/${flowerBouquetId}`);
            dispatch({
                type: REMOVE_FLOWER_BOUQUET,
                payload: {flowerBouquetId}
            });
        } catch (err) { console.log(err);}
    }
};