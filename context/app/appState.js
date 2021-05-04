import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    UPLOADING_FILE,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CLEAR_ALERT,
    SHOW_ALERT,
    CLEAR_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOAD
} from '../../types';
import axiosClient from '../../config/axios';
import { array } from 'yup';

const AppState = (props) => {

    // Inicializar State 
    const initialState = {
        alert: null,
        file_name: '',
        file_original_name: '',
        loading: null,
        download: 1,
        autor: null,
        password: '',
        url: ''
    }

    const [state, dispatch] = useReducer(appReducer, initialState);
    
    const showAlert = (message) => {
        dispatch({
            type: SHOW_ALERT,
            payload: message
        })
        setTimeout(() => {
            clearAlert()
        }, 3000)
    };

    const clearAlert = () => {
        dispatch({
            type: CLEAR_ALERT
        })
    }

    const uploadFiles = async (formData, fileOriginalName) => {
        // Mostrar cargando archivo
        dispatch({
            type: UPLOADING_FILE
        });

        try {
            // Almacenamos archivo en el servidor 
            const response = await axiosClient.post('/api/files', formData);
            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    file_name: response.data.file,
                    file_original_name: fileOriginalName
                }
            });
        } catch (error) {
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.msg
            });
        };
    };

    const createLink = async () => {
        const data = {
            name: state.file_name,
            original_name: state.file_original_name,
            download: state.download,
            autor: state.autor,
            password: state.password
        }
        try {
            const response = await axiosClient.post('/api/links', data);
            console.log(response.data.url)
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: response.data.url
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: CREATE_LINK_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const clearState = () => {
        dispatch({
            type: CLEAR_STATE
        })
    }

    // Modificar state de password
    const addPassword = password => {
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    // Modificar state de download
    const addDownload = download => {
        dispatch({
            type: ADD_DOWNLOAD,
            payload: download
        })
    }

    return ( 
        <appContext.Provider
            value={{
                alert: state.alert,
                file_name: state.file_name,
                file_original_name: state.file_original_name,
                loading: state.loading,
                download: state.download,
                autor: state.autor,
                password: state.password,
                url: state.url,
                showAlert,
                uploadFiles,
                createLink,
                clearState,
                addPassword,
                addDownload
            }}
        >
            {props.children}
        </appContext.Provider>
     );
}
 
export default AppState;