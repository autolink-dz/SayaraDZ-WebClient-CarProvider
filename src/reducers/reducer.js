import {combineReducers} from 'redux'
import gestionReducer from './gestionReducer'
import versionReducer from './versionReducer'
import marquesListReducer from "./marquesListReducer";
import fabAdminListReducer from "./fabAdminListReducer";
import showDialogReducer from "./showDialogReducer";
import commandesReducer from "./commandesReducer";
import modeleListReducer from "./modeleListReducer";
import versionListReducer from "./versionListReducer";
import optionsColorsReducer from "./optionsColorsReducer";
import signInReducer from './signInReducer'
import { reducer as formReducer } from 'redux-form'

const AllReducers = combineReducers({
    signInReducer,
    marquesListReducer,
    fabAdminListReducer,
    showDialogReducer,
    gestionReducer,
    versionReducer,
    commandesReducer,
    modeleListReducer,
    versionListReducer,
    optionsColorsReducer,
    form : formReducer
});

export default AllReducers;