import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import marquesListReducer from "./marquesListReducer";


const AllReducers = combineReducers({
    fireSignIn, marquesListReducer
});

export default AllReducers;