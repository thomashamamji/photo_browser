import {
    USER_CONNECTION_FAILED,
    USER_CONNECTION_SUCCED,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_SUCCED,
    USER_DISCONNECTED,
    AUTH_OK,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
    token : "",
    user : {},
    success : null,
    isLoading : true
};

export default (state = initialState, action) => {
    const {payload} = action;
    console.log(action);
    switch (action.type) {
        case USER_CONNECTION_FAILED :
            return {
                ...state,
                success : false,
                isLoading : false
            };
        case USER_CONNECTION_SUCCED :
            localStorage.setItem("userToken", JSON.stringify(payload.token));
            return {
                ...state,
                isLoading : false,
                success : true,
                token : payload.token
            };
        case USER_DISCONNECTED :
            localStorage.setItem("userToken", "");
            return {
                ...state,
                isLoading: false,
                success : true
            };
        case USER_REGISTRATION_FAILED :
            return {
                ...state,
                isLoading : false,
                success : false
            };
        case USER_REGISTRATION_SUCCED :
            return {
                ...state,
                isLoading : false,
                success : true
            };
        case AUTH_OK :
            return {
                ...state,
                isLoading : false,
                success : true
            };
        case AUTH_ERROR :
            return {
                ...state,
                isLoading : false,
                success : false
            };
        default :
            return state;
    }
}