
import {SIGN_IN, LOG_OUT} from '../actions/auth.action';

const initialState = {
    currentUserId: localStorage.getItem('currentUserId') ?? null,
    userRole: localStorage.getItem('userRole') ?? null,
    jwt: localStorage.getItem('jwt') ?? null,
    jwtExpirationDate: localStorage.getItem('jwtExpirationDate') ?? null
};

const saveInLocalStorage = objectToSave => 
    Object.keys(objectToSave).forEach( key => localStorage.setItem(key, objectToSave[key]));

const removeFromLocalStorage = objectToSave => 
    Object.keys(objectToSave).forEach( key => localStorage.removeItem(key));

const AuthReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case SIGN_IN:
            newState = {
                ...state,
                currentUserId: payload.currentUser?.information._id,
                userRole: payload.currentUser?.information.userRole,
                jwt: payload.currentUser?.token,
                jwtExpirationDate: payload.currentUser?.expiredAt
            };
            saveInLocalStorage(newState);
            break;
        
        case LOG_OUT:
            newState = {
                ...state,
                currentUserId: null,
                userRole: null,
                jwt: null,
                jwtExpirationDate: null
            };
            console.log(newState);
            removeFromLocalStorage(newState);
            break;

        default: newState = state;
    }

    return newState;
};

export default AuthReducer;