
import { ADD_FLOWER, EDIT_FLOWER, REMOVE_FLOWER, FETCH_FLOWERS } from '../actions/flowers.action';

const initialState = { flowers:null };

const FlowersReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case FETCH_FLOWERS:
            newState = {
                ...state,
                flowers:payload.flowers
            };
            break;

        case ADD_FLOWER:
            newState = {
                ...state,
                flowers:{...state.flowers, [payload.flowerId]: payload.flower}
            }
            break;
        
        case EDIT_FLOWER:
            newState = {
                ...state,
                flowers:{
                    ...state.flowers,
                    [payload.flowerId]: payload.updatedFlower
                }
            }
            break;

        case REMOVE_FLOWER:
            const temp = {...state.flowers};
            delete temp[payload.flowerId];
            newState = {
                ...state,
                flowers:temp
            }
            break;

        default: newState = state;
    }

    return newState;
};

export default FlowersReducer;