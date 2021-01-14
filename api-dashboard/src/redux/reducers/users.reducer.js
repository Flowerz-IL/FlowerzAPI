
import { ADD_USER, EDIT_USER, REMOVE_USER, FETCH_USERS } from '../actions/users.action';
import { ADD_PROVIDER, REMOVE_PROVIDER } from '../actions/providers.action';

const initialState = { users:null };

const UsersReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case FETCH_USERS:
            newState = {
                ...state,
                users:payload.users
            };
            break;

        case ADD_USER:
            newState = {
                ...state,
                users:{...state.users, [payload.userId]: payload.user}
            }
            break;
        
        case EDIT_USER:
            newState = {
                ...state,
                users:{...state.users, [payload.userId]: payload.updatedUser}
            }
            break;

        case REMOVE_USER:
            const temp = {...state.users};
            delete temp[payload.userId];
            newState = {
                ...state,
                users:temp
            }
            break;
        
        case ADD_PROVIDER:
            newState = {
                ...state,
                users:{
                    ...state.users,
                    [payload.provider.userId]: {
                        ...state.users[payload.provider.userId],
                        providerId: payload.providerId,
                        userRole: 'PROVIDER'
                    }
                }
            }
            break;

        case REMOVE_PROVIDER:
            newState = {
                ...state,
                users:{
                    ...state.users,
                    [payload.provider.userId]: {
                        ...state.users[payload.provider.userId],
                        providerId: '-',
                        userRole: 'USER'
                    }
                }
            }
            break;

        default: newState = state;
    }

    return newState;
};

export default UsersReducer;