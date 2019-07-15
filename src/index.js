import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Fabricant from './components/fabricant/fabricant';
import {Provider} from 'react-redux'
import AllReducers from './reducers/reducer'
import {createStore,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import Firebase, { FirebaseContext } from './utils/firebase/indexFireBase'

const store = createStore(AllReducers,applyMiddleware(thunk));
ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <App/>
        </Provider>
    </FirebaseContext.Provider>
    ,
    document.getElementById('root'));
