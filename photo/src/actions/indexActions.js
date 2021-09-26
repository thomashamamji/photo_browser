import axios from 'axios';
import {
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS
} from './types';

axios.defaults.baseURL = "http://localhost:5000";

export const getPhotosFromKeyword = k => async dispatch => {
    try {
        const res = await axios.get('/client/photos/' + k);
        dispatch({
            type : KEYWORD_PHOTOS_SUCCESS,
            payload : res.data
        });
    }

    catch (err) {
        dispatch({
            type : KEYWORD_PHOTOS_FAILURE
        });
    }
}

export const getVideosFromKeyword = k => async dispatch => {
    try {
        const res = await axios.get('/client/videos/' + k);
        dispatch({
            type : KEYWORD_VIDEOS_SUCCESS,
            payload : res.data
        });
    }

    catch (err) {
        dispatch({
            type : KEYWORD_VIDEOS_FAILURE
        });
    }
}
