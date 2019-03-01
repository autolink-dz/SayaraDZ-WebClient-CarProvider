import {combineReducers} from 'redux'
import fireSignIn from './fireSignIn'
import addFabricantReducer from "./addFabricantReducer";
import getFabricantListReducer from "./getFabricantListReducer";


const AllReducers = combineReducers({
    fireSignIn,addFabricantReducer,getFabricantListReducer
});

export default AllReducers;