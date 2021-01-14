
import { ADD_PROVIDER, EDIT_PROVIDER, REMOVE_PROVIDER, FETCH_PROVIDERS } from '../actions/providers.action';

const initialState = { providers:null };

const ProvidersReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case FETCH_PROVIDERS:
            newState = {
                ...state,
                providers:payload.providers
            };
            break;

        case ADD_PROVIDER:
            newState = {
                ...state,
                providers:{...state.providers, [payload.providerId]: payload.provider}
            }
            break;
        
        case EDIT_PROVIDER:
            newState = {
                ...state,
                providers:{...state.providers, [payload.providerId]: payload.updatedProvider}
            }
            break;

        case REMOVE_PROVIDER:
            const temp = {...state.providers};
            delete temp[payload.providerId];
            newState = {
                ...state,
                providers:temp
            }
            break;

        default: newState = state;
    }

    return newState;
};

export default ProvidersReducer;