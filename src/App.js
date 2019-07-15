import React, {Component} from 'react';
import './App.css';
import SignInUi from "./components/signIn/signInUI";
import Admin from './components/admin/admin';
import Commande from './containers/fabricant/commande';
import Stock from './containers/fabricant/stock';
import SimulerPrixModel from './containers/fabricant/simulerPrixModel';
import SimulerPrixVersions from './containers/fabricant/simulerPrixVersions';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {PrivateRoute} from './utils/privateRoute'
import {createMuiTheme} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import FabricantAdmin from "./components/admin/fabricantAdmin";
import {FirebaseContext} from "./utils/firebase/indexFireBase";
import SimulerPrixOptions from "./containers/fabricant/simulerPrixOptions";


import Modele from './components/fabricant/mains/gestion/gestionModele/modele'
import Versions from './components/fabricant/mains/gestion/gestionVersion/versionByModele'
const theme = createMuiTheme({
    palette: {
        primary: {main: '#158CF6'},
        secondary: {main: '#158CF6'},
        submit: {main: '#3BB540'}
    },
    typography: {useNextVariants: true},
});

class App extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            {/* Admin Routes */}
                            <PrivateRoute path="/admin/:id" component={FabricantAdmin}/>
                            <PrivateRoute path='/admin' component={Admin}/>

                            {/* Fabricant Routes */}


                            <PrivateRoute path="/fabricant/gestion/modele" component={Modele}/>
                            <PrivateRoute path="/fabricant/gestion/versions/:id/:nom" component={Versions}/>
                         
{/*
                            <PrivateRoute path='/fabricant/gestion/modele' component={() =>
                                <FirebaseContext.Consumer>{
                                    firebase => {
                                        return <Modele firebase={firebase}/>
                                    }
                                }
                                </FirebaseContext.Consumer>
                            }/>
                            
 */}                              
                            <PrivateRoute path='/fabricant/stock' component={() =>
                                <FirebaseContext.Consumer>{
                                    firebase => {
                                        return <Stock firebase={firebase}/>
                                    }
                                }
                                </FirebaseContext.Consumer>
                            }/>
                            <PrivateRoute path="/fabricant/commande" component={Commande}/>

                            {/* Fabricant/Simulation Routes */}
                            <PrivateRoute path="/fabricant/simulation/versions/:id/:version" component={SimulerPrixOptions}/>
                            <PrivateRoute path="/fabricant/simulation/versions/:id" component={SimulerPrixVersions}/>

                            <PrivateRoute path="/fabricant/simulation" component={SimulerPrixModel}/>
                            <Route component={SignInUi}/>
                            <Route path="/" component={SignInUi} exact/>
                        </Switch>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
