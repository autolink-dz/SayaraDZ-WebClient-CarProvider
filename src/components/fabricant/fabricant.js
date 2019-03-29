import React, {Component} from 'react';
import NavBar  from './navbar'
import Dashbord  from './sidebar/dashbord'
import Gestion  from './sidebar/gestion'
import Main  from './mains/dashbord/main'
import Grid from '@material-ui/core/Grid';
import Modele from './mains/gestion/gestionModele/modele'
import Version from './mains/gestion/version'
import Option from './mains/gestion/option'

import { Route, Switch} from 'react-router-dom'

class Fabricant extends Component {
    render() {

        return (
            <div >
                <div className='main' style={{paddingTop:70}}>
                 </div>
            </div>
        );
    }
}

export default Fabricant;