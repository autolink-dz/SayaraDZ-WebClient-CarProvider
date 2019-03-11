import React, {Component} from 'react';
import NavBar  from './navbar'
import Dashbord  from './sidebar/dashbord'
import Gestion  from './sidebar/gestion'
import Stock  from './sidebar/stock'
import Simulation  from './sidebar/simulation'
import Commande  from './sidebar/commande'
import navbarReducer  from './../../reducers/navbarReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import Main  from './main'
import MainGestion  from './mains/maingestion'
import Grid from '@material-ui/core/Grid';

import Modele from './mains/gestion/modele'
import Version from './mains/gestion/version'
import Option from './mains/gestion/option'
import Couleur from './mains/gestion/couleur'

import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
class Fabricant extends Component {
    render() {
        const s=this.props.etat;
        const s2=this.props.s_etat;

        let affiche=<Gestion/>
        
        return (
            <div >
                <NavBar />
                
                
                 <Switch>
                     
                 <Route path='/fabricant/dashbord' render={props =>
                    <Grid container spacing={24}>
                        <Dashbord />
                        <Main />
                    </Grid>
                    } />
                <Route path='/fabricant/gestion/modele' render={props =>
                    <Grid container spacing={24}>
                        {affiche}
                        <Modele />
                    </Grid>
                    } />
                <Route path='/fabricant/gestion/version' render={props =>
                    <Grid container spacing={24}>
                        {affiche}
                        <Version />
                    </Grid>
                    } />
                <Route path='/fabricant/gestion/option' render={props =>
                    <Grid container spacing={24}>
                        {affiche}
                        <Option />
                    </Grid>
                    } />
                <Route path='/fabricant/gestion/couleur' render={props =>
                    <Grid container spacing={24}>
                        {affiche}
                        <Couleur />
                    </Grid>
                    } />
                 </Switch>
                
            </div>
        );
    }
}

function mapStateToProps(state) {

}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        navbarReducer
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(Fabricant);