import { combineReducers } from 'redux';
import indexReducer from './indexReducer';
import userReducer from './userReducer';

export default combineReducers({
    index : indexReducer,
    user : userReducer
});