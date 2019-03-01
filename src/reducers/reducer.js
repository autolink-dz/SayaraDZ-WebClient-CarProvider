import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import navbarReducer from './navbarReducer'
import gestionReducer from './gestionReducer'

const AllReducers = combineReducers({
    fireSignIn, navbarReducer, gestionReducer
});

export default AllReducers;