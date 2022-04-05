import axios from 'axios';
import {
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS,
    ALBUM_ADDED,
    ALBUM_NOT_ADDED,
    ALBUMS_LISTING_FAILED,
    ALBUMS_LISTING_SUCCESS,
    MEDIA_ADDED,
    MEDIA_NOT_ADDED,
    ALBUM_MEDIAS_LISTED,
    ALBUM_MEDIAS_NOT_LISTED
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
        console.log(token);
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

export const addMediaToAlbum = (data, token) => async dispatch => {
    try {
        console.log(token);
        const res = await axios.post('/index/album/media/add', data, {
            headers : {
                Authorization : token,
                "Content-Type" : "application/json"
            }
        });
        dispatch({
            type : MEDIA_ADDED,
            payload : res.data
        });
    }

    catch (err) {
        console.log(err);
        dispatch({
            type : MEDIA_NOT_ADDED
        });
    }
}

export const listAlbumMedias = (name, token) => async dispatch => {
    try {
        const res = await axios.get(`/index/album/media/list/${name}`, {
            headers : {
                Authorization : token
            }
        });
        dispatch({
            type :  ALBUM_MEDIAS_LISTED,
            payload : res.data
        });
    }

    catch (err) {
        console.log(err);
        dispatch({
            type : ALBUM_MEDIAS_NOT_LISTED
        });
    }
}