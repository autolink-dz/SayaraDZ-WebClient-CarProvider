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

class Fabricant extends Component {
    render() {
        const s=this.props.etat;
        const s2=this.props.s_etat;
        
        let affiche;
        let main;
        if (s == 0) {
            affiche = <Dashbord/>;
            main = <Main />;
        } else if(s == 1) {
            affiche = <Gestion/>;
            if(s2==1){
                main = <Modele />;
            }else if(s2==2){
                main = <Version />;
            }else if(s2==3){
                main = <Option />;
            }else if(s2==4){
                main = <Couleur />;
            }
        }else if(s == 2){
            affiche = <Stock/>;
        }else if(s == 3){
            affiche = <Simulation/>;
        }else if(s == 4){
            affiche = <Commande/>;
        }
        return (
            <div >
                <NavBar />
                <Grid container spacing={24}>
                {affiche}
                {main}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        etat : state.navbarReducer.etat,
        s_etat : state.navbarReducer.s_etat
        
    };
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