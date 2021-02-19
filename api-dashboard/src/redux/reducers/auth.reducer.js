
import {SIGN_IN, LOG_OUT} from '../actions/auth.action';

const getFromLocalStorage = () => {
    const expirationDate = localStorage.getItem('jwtExpirationDate')
    if(expirationDate && expirationDate * 1000 >= new Date().getTime()){
        return {
            currentUserId: localStorage.getItem('currentUserId') ?? null,
            userName: localStorage.getItem('userName') ?? null,
            userRole: localStorage.getItem('userRole') ?? null,
            jwt: localStorage.getItem('jwt') ?? null,
            jwtExpirationDate: localStorage.getItem('jwtExpirationDate') ?? null,
            providerId: localStorage.getItem('providerId') ?? null
        };
    }else 
    return {currentUserId:null, userName:null, userRole:null, jwt:null, jwtExpirationDate:null, providerId:null} 
};

const saveInLocalStorage = objectToSave => 
    Object.keys(objectToSave).forEach( key => localStorage.setItem(key, objectToSave[key]));

const removeFromLocalStorage = objectToSave => 
    Object.keys(objectToSave).forEach( key => localStorage.removeItem(key));

const initialState = getFromLocalStorage();

const AuthReducer = (state = initialState, action) => {
    let newState;
    const {type, payload} = action;
    
    switch(type){
        case SIGN_IN:
            newState = {
                ...state,
                currentUserId: payload.currentUser?.information._id,
                userName: payload.currentUser?.information.userName,
                userRole: payload.currentUser?.information.userRole,
                jwt: payload.currentUser?.token,
                jwtExpirationDate: payload.currentUser?.expiredAt,
                providerId: payload.currentUser?.information?.providerId
            };
            saveInLocalStorage(newState);
            break;
        
        case LOG_OUT:
            newState = {
                ...state,
                currentUserId: null,
                userName: null,
                userRole: null,
                jwt: null,
                jwtExpirationDate: null,
                providerId: null
            };
            removeFromLocalStorage(newState);
            break;

        default: newState = state;
    }

    return newState;
};

export default AuthReducer;