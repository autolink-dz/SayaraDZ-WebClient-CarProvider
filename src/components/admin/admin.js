import React, {Component} from 'react';
import './../../styles/admin.css'
import MenuAppBar from "./menuAppBar";
import MainAdmin from "../../containers/admin/mainAdmin";
import AddMarque from "../../containers/admin/addMarque";
import {FirebaseContext} from "../../utils/firebase/indexFireBase";

class Admin extends Component {
        render() {
        return (
            <div>
                <MenuAppBar />
                <div className='main'>
                    <div className='add' >
                        <FirebaseContext.Consumer>{
                            firebase => {
                                return <AddMarque firebase={firebase}/>
                            }
                        }
                        </FirebaseContext.Consumer>
                    </div>
                    <MainAdmin />
                </div>
            </div>
        );
    }
}

export default Admin;