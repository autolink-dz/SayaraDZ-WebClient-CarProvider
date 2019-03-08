import React, {Component} from 'react';
import './../../styles/admin.css'
import MenuAppBar from "./menuAppBar";
import Dashboard from "./dashboard";
import {Route} from "react-router-dom";
import MainAdmin from "../../containers/admin/mainAdmin";
import AddMarque from "../../containers/admin/addMarque";

class Admin extends Component {
    render() {
        return (
            <div>
                <MenuAppBar />

                <div className='main'>
                    <div className='add' >
                        <AddMarque />
                    </div>
                    <MainAdmin />
                </div>

                <Route path={'/admin/gestion'} component={Dashboard}/>
            </div>
        );
    }
}

export default Admin;