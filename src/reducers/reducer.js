import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import marquesListReducer from "./marquesListReducer";
import fabAdminListReducer from "./fabAdminListReducer";


const AllReducers = combineReducers({
    fireSignIn, marquesListReducer,fabAdminListReducer
});

export default AllReducers;