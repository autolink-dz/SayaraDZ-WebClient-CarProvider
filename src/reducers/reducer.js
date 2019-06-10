import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import gestionReducer from './gestionReducer'
import versionReducer from './versionReducer'
import { reducer as formReducer } from 'redux-form'
const AllReducers = combineReducers({
    fireSignIn, gestionReducer, versionReducer,form : formReducer
});

export default AllReducers;