import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import marquesListReducer from "./marquesListReducer";
import fabAdminListReducer from "./fabAdminListReducer";
import showDialogReducer from "./showDialogReducer";


const AllReducers = combineReducers({
    fireSignIn, marquesListReducer,fabAdminListReducer,showDialogReducer
});

export default AllReducers;