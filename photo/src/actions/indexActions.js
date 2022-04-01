import axios from 'axios';
import {
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS,
    ALBUM_ADDED,
    ALBUM_NOT_ADDED,
    ALBUMS_LISTING_FAILED,
    ALBUMS_LISTING_SUCCESS
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
            headers : {
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

export const listAlbums = token => async dispatch => {
    try {
        const res = await axios.get(`/index/album/list`, {
            headers : {
                Authorization : token
            }
        });
        dispatch({
            type : ALBUMS_LISTING_SUCCESS,
            payload : res.data
        });
    }

    catch (err) {
        console.log(err);
        dispatch({
            type : ALBUMS_LISTING_FAILED
        });
    }
}