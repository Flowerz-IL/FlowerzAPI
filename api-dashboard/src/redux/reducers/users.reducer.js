
import users from '../../Dummy_Data/user.dummy.data';
import { UPDATE_OR_CREATE_USER, REMOVE_USER } from '../actions/users.action';

const initialState = { users };

const UsersReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case UPDATE_OR_CREATE_USER:
            newState = {
                ...state,
                users:{...state.users, [payload.userId]: payload.user}
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

        default: newState = state;
    }

    return newState;
};

export default UsersReducer;