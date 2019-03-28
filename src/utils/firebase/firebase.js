import * as firebase from 'firebase/app';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAtt4h5FUVwtrMPJK2EHmRnHcq9MpCgj_o",
    authDomain: "sayaradz-75240.firebaseapp.com",
    databaseURL: "https://sayaradz-75240.firebaseio.com",
    projectId: "sayaradz-75240",
    storageBucket: "sayaradz-75240.appspot.com",
    messagingSenderId: "455736782811"
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
    }
    storage = ()=>{
        return firebase.app().storage();
    };
    storageRef =  () => {
        return firebase.app().storage().ref()
    };
}

export default Firebase;