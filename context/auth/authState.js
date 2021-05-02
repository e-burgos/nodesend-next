import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import { 
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAR_ALERT,
    SUCCESS_ALERT,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    AUTH_USER,
    LOGOUT_USER
    } from '../../types';

const AuthState = (props) => {
    
    // Inicializar state
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        auth: null,
        user: null,
        message: null,
        messageError: null,
    };

    // Definir reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Registrar usuario
    const registerUser = async userData => {
        try {
            const response = await axiosClient.post('/api/users', userData);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg
            });
        };
        // Limpiar alerta
        setTimeout(() => {
            clearAlert();
        }, 3000);
    };

    const loginUser = async userData => {
       try {
            const response = await axiosClient.post('/api/auth', userData)
            // Enviar mensaje
            successAlert('Usuario logueado correctamente, sera redirigido al inicio...');
            // Enviar token
            setTimeout(() => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data.token
                });
            }, 2000);

       } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        };
        // Limpiar alerta
        setTimeout(() => {
            clearAlert();
        }, 2000);
    } 
    
    // Usuario autenticado
    const authenticateUser = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        };
        try {
            const response = await axiosClient.get('/api/auth')
            dispatch({
                type: AUTH_USER,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        };
        // Limpiar alerta
        setTimeout(() => {
            clearAlert();
        }, 3000);
    }

    // Usuario autenticado
    const logoutUser =  () => {
        dispatch({
            type: LOGOUT_USER,
        });
    }

    // Enviar alerta existosa
    const successAlert = (message) => {
        dispatch({
            type: SUCCESS_ALERT,
            payload: message
        })
    }

    // Limpiar alertas
    const clearAlert = () => {
        dispatch({
            type: CLEAR_ALERT,
        })
    }

    return ( 
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                messageError: state.messageError,
                registerUser,
                loginUser,
                authenticateUser,
                logoutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthState;