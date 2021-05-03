import {
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_ERROR,
    UPLOADING_FILE,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CLEAR_ALERT,
    SHOW_ALERT
} from '../../types';

const appReducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            };
        case CLEAR_ALERT:
            return {
                ...state, 
                alert: null
            };
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state, 
                file_name: action.payload.file_name,
                file_original_name: action.payload.file_original_name,
                loading: null
            }
        case UPLOAD_FILE_ERROR:
            return {
                ...state, 
                alert: action.payload,
                loading: null
            }
        case UPLOADING_FILE:
            return {
                ...state,
                loading: true
            }
        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                url: action.payload
            }
        case CREATE_LINK_ERROR:
            return {
                ...state, 
                alert: action.payload,
            }
        default:
            return state
    }
}

export default appReducer;

