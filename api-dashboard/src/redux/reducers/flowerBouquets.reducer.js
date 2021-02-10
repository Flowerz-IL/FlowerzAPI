
import { ADD_FLOWER_BOUQUET, EDIT_FLOWER_BOUQUET, REMOVE_FLOWER_BOUQUET, FETCH_FLOWER_BOUQUETS } from '../actions/flowerBouquets.action';

const initialState = { flowerBouquets:null };

const FlowerBouquetsReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;

    switch(type){
        case FETCH_FLOWER_BOUQUETS:
            newState = {
                ...state,
                flowerBouquets:payload.flowerBouquets
            };
            break;

        case ADD_FLOWER_BOUQUET:
            newState = {
                ...state,
                flowerBouquets:{...state.flowerBouquets, [payload.newFlowerBouquetId]: payload.flowerBouquet}
            }
            break;
        
        case EDIT_FLOWER_BOUQUET:
            newState = {
                ...state,
                flowerBouquets:{
                    ...state.flowerBouquets,
                    [payload.flowerBouquetId]: payload.flowerBouquet
                }
            }
            break;

        case REMOVE_FLOWER_BOUQUET:
            const temp = {...state.flowerBouquets};
            delete temp[payload.flowerBouquetId];
            newState = {
                ...state,
                flowerBouquets:temp
            }
            break;

        default: newState = state;
    }
    return newState;
};

export default FlowerBouquetsReducer;