import {
    KEYWORD_PHOTOS_FAILURE,
    KEYWORD_PHOTOS_SUCCESS,
    KEYWORD_VIDEOS_FAILURE,
    KEYWORD_VIDEOS_SUCCESS
} from '../actions/types';

const initialState = {
    photos : [],
    videos : [],
    success : null,
    isLoading : true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case KEYWORD_PHOTOS_SUCCESS :
            return {
                ...state,
                photos : action.payload,
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
                videos : action.payload,
                success : true,
                isLoading : false
            };
        case KEYWORD_VIDEOS_FAILURE :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        default :
            return state;
    }
}