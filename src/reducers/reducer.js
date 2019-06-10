import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import gestionReducer from './gestionReducer'
import versionReducer from './versionReducer'
import { reducer as formReducer } from 'redux-form'
import marquesListReducer from "./marquesListReducer";
import fabAdminListReducer from "./fabAdminListReducer";
import showDialogReducer from "./showDialogReducer";


const AllReducers = combineReducers({
    fireSignIn, marquesListReducer,fabAdminListReducer,showDialogReducer,gestionReducer, versionReducer,form : formReducer
});

export default AllReducers;