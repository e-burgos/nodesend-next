import { 
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAR_ALERT,
    SUCCESS_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    AUTH_USER,
    LOGOUT_USER,
    GET_LINKS_SUCCESS,
    } from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                message: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                auth: true
            };
        case LOGIN_ERROR:    
        case REGISTER_ERROR:
            return {
                ...state,
                messageError: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                user: action.payload,
                auth: true
            }
        case SUCCESS_ALERT:
            return {
                ...state,
                message: action.payload,
            }
        case CLEAR_ALERT:
            return {
                ...state,
                message: null,
                messageError: null,
            }
        case LOGOUT_USER:
            localStorage.removeItem('token'); 
            return {
                ...state,
                token: '',
                auth: null,
                user: null,
            }
        case GET_LINKS_SUCCESS:
            return {
                ...state,
                links: action.payload
            }
        default:
            return state
    }
}

export default authReducer;