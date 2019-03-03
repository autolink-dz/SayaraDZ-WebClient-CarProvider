import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import getFabricantListReducer from "./getFabricantListReducer";


const AllReducers = combineReducers({
    fireSignIn,getFabricantListReducer
});

export default AllReducers;