import {combineReducers} from 'redux'
import signInReducer from './signInReducer'
import gestionReducer from './gestionReducer'
import versionReducer from './versionReducer'
import marquesListReducer from "./marquesListReducer";
import fabAdminListReducer from "./fabAdminListReducer";
import showDialogReducer from "./showDialogReducer";
import commandesReducer from "./commandesReducer";


const AllReducers = combineReducers({
    signInReducer,
    marquesListReducer,
    fabAdminListReducer,
    showDialogReducer,
    gestionReducer,
    versionReducer,
    commandesReducer
});

export default AllReducers;