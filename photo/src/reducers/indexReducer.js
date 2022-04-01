import {
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS,
    ALBUM_ADDED,
    ALBUM_NOT_ADDED,
    ALBUMS_LISTING_SUCCESS,
    ALBUMS_LISTING_FAILED
} from '../actions/types';

const initialState = {
    photos : [],
    videos : [],
    success : null,
    isLoading : true,
    album : {},
    albums : []
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
        default :
            return state;
    }
}