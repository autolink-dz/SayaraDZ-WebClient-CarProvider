import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import gestionReducer from './gestionReducer'
import versionReducer from './versionReducer'

const AllReducers = combineReducers({
    fireSignIn, gestionReducer, versionReducer
});

export default AllReducers;