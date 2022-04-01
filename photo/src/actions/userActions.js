import axios from "axios";
import {
    USER_CONNECTION_FAILED,
    USER_CONNECTION_SUCCED,
    USER_DISCONNECTED,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_SUCCED,
    AUTH_OK,
    AUTH_ERROR
} from "./types";

axios.defaults.baseURL = "http://localhost:5000";

export const userLogin = credentials => async dispatch => {
    try {
        const res = await axios.post("/user/login", credentials);
        dispatch({
            type : USER_CONNECTION_SUCCED,
            payload : res.data
        });
    }

    catch (err) {
        console.log(err);
        dispatch({
            type : USER_CONNECTION_FAILED
        });
    }
}

export const userRegistration = data => async dispatch => {
    try {
        const res = await axios.post("/user/register", data);
        dispatch({
            type : USER_REGISTRATION_SUCCED,
            payload : res.data
        });
    }

    catch (err) {
        dispatch({
            type : USER_REGISTRATION_FAILED
        });
    }
}

export const getUserAuthStatus = token => async dispatch => {
    try {
        const res = await axios.get('/user/auth/check', {
            headers : {
                "Authorization" : token
            }
        });
        dispatch({
            type : AUTH_OK
        });
    }

    catch (e) {
        dispatch({
            type : AUTH_ERROR
        });
    }
}