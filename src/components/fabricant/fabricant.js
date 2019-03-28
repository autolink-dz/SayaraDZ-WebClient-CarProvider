import React, {Component} from 'react';
import NavBar  from './navbar'
import Dashbord  from './sidebar/dashbord'
import Gestion  from './sidebar/gestion'
import Stock  from './sidebar/stock'
import Main  from './mains/dashbord/main'
import Grid from '@material-ui/core/Grid';
import Modele from './mains/gestion/gestionModele/modele'
import Version from './mains/gestion/version'
import Option from './mains/gestion/option'

import { Route, Switch} from 'react-router-dom'
import {FirebaseContext} from "../../utils/firebase/indexFireBase";

class Fabricant extends Component {
    render() {

        return (
            <div >
                <NavBar />
                
                <div className='main' style={{paddingTop:70}}>
                 <Switch>
                     
                        <Route path='/fabricant/dashbord' render={props =>
                            <Grid container spacing={24}>
                                <Dashbord />
                                <Main />
                            </Grid>
                            } />
                        <Route path='/fabricant/gestion/modele' render={props =>
                            <Grid container spacing={24}>
                                <Gestion/>
                                <Modele />
                            </Grid>
                            } />
                        <Route path='/fabricant/gestion/version' render={props =>
                            <Grid container spacing={24}>
                                <Gestion/>
                                <Version />
                            </Grid>
                            } />
                        <Route path='/fabricant/gestion/option' render={props =>
                            <Grid container spacing={24}>
                                <Gestion/>
                                <Option />
                            </Grid>
                            } />
                        <Route path='/fabricant/gestion/couleur' render={props =>
                            <Grid container spacing={24}>
                                <Gestion/>
                            </Grid>
                            } />

                        <Route path='/fabricant/stock' render={props =>
                            <FirebaseContext.Consumer>{
                                firebase=>
                                    {
                                        return <Stock firebase={firebase} />
                                    }
                            }
                            </FirebaseContext.Consumer>

                            } />
                        <Route path='/fabricant/simulation' render={props =>
                            <Grid container spacing={24}>
                                <Gestion/>
                            </Grid>
                            } />
                        <Route path='/fabricant/commandes' render={props =>
                            <Grid container spacing={24}>
                                <Gestion/>
                            </Grid>
                            } />
                 </Switch>
                 </div>
            </div>
        );
    }
}

export default Fabricant;