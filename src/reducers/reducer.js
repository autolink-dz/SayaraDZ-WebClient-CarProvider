import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import navbarReducer from './navbarReducer'


const AllReducers = combineReducers({
    fireSignIn, navbarReducer
});

export default AllReducers;