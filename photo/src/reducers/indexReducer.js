import {
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS,
    ALBUM_ADDED,
    ALBUM_NOT_ADDED,
    ALBUMS_LISTING_SUCCESS,
    ALBUMS_LISTING_FAILED,
    MEDIA_ADDED,
    MEDIA_NOT_ADDED,
    ALBUM_MEDIAS_LISTED,
    ALBUM_MEDIAS_NOT_LISTED
} from '../actions/types';

const initialState = {
    photos : [],
    videos : [],
    success : null,
    isLoading : true,
    album : {},
    albums : [],
    media : {},
    medias : []
};

export default (state = initialState, action) => {
    const { payload } = action;
    console.log(action);
    switch (action.type) {
        case KEYWORD_PHOTOS_SUCCESS :
            return {
                ...state,
                photos : action.payload.data,
                success : true,
                isLoading : false
            };
        case KEYWORD_PHOTOS_FAILURE :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        case KEYWORD_VIDEOS_SUCCESS :
            return {
                ...state,
                videos : action.payload.data,
                success : true,
                isLoading : false
            };
        case KEYWORD_VIDEOS_FAILURE :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        case ALBUM_ADDED :
            return {
                ...state,
                success : true,
                isLoading : false,
                album : payload
            };
        case ALBUM_NOT_ADDED :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        case ALBUMS_LISTING_SUCCESS :
            return {
                ...state,
                success : true,
                isLoading : false,
                albums : payload.data
            };
        case ALBUMS_LISTING_FAILED :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        case MEDIA_ADDED :
            return {
                ...state,
                success : true,
                isLoading : false,
                media : payload.data
            };
        case MEDIA_NOT_ADDED :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        case ALBUM_MEDIAS_LISTED :
            return {
                ...state,
                success : true,
                isLoading : false,
                medias : payload.result
            };
        case ALBUM_MEDIAS_NOT_LISTED :
            return {
                ...state,
                success : false,
                isLoading : false,
                medias : []
            };
        default :
            return state;
    }
}