import axios from 'axios';
import {
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS,
    ALBUM_ADDED,
    ALBUM_NOT_ADDED
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

export const addAlbum = (n, t) => async dispatch => {
    try {
        const res = await axios.get('/index/album/add/' + n, {
            Headers : {
                Authorization : t
            }
        });
        dispatch({
            type : ALBUM_ADDED,
            payload : res.data
        });
    }

    catch (e) {
        dispatch({
            type : ALBUM_NOT_ADDED
        });
    }
}
