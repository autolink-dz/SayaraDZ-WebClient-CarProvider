import React, {Component} from 'react';
import './../../styles/fabricantAdmin.css'
import MenuAppBar from "./menuAppBar";
import MainFabricants from "../../containers/admin/mainFabricants";
import AddFab from "../../containers/admin/addFab";

class FabricantAdmin extends Component {
    render() {
        return (
            <div>
                <MenuAppBar />
                <div className='mainFab'>
                    <div className='add' >
                        <AddFab id_marque={this.props.match.params.id} />
                    </div>
                    <div className="tFabs">
                        <MainFabricants id_marque={this.props.match.params.id} />
                    </div>
                </div>
            </div>

        );
    }
}

export default FabricantAdmin;