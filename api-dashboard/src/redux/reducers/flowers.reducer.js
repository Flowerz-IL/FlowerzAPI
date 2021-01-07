
import flowers from '../../Dummy_Data/flower.dummy.data';
import { UPDATE_OR_CREATE_FLOWER, REMOVE_FLOWER } from '../actions/flowers.action';

const initialState = { flowers };

const FlowersReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case UPDATE_OR_CREATE_FLOWER:
            newState = {
                ...state,
                flowers:{...state.flowers, [payload.flowerId]: payload.flower}
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