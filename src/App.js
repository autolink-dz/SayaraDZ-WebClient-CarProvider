import React, {Component} from 'react';
import './App.css';
import SignInUi from "./components/signIn/signInUI";
import Admin from './components/admin/admin';
import Commande from './containers/fabricant/commande';
import Stock from './containers/fabricant/stock';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {PrivateRoute} from './utils/privateRoute'
import {createMuiTheme} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import FabricantAdmin from "./components/admin/fabricantAdmin";
import {FirebaseContext} from "./utils/firebase/indexFireBase";
import Dashbord  from './components/fabricant/sidebar/dashbord'
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

                            <PrivateRoute path='/fabricant/stock' component={() =>
                                <FirebaseContext.Consumer>{
                                    firebase => {
                                        return <Stock firebase={firebase}/>
                                    }
                                }
                                </FirebaseContext.Consumer>
                            }/>
                            <PrivateRoute path="/fabricant/commande" component={Commande}/>
                            <PrivateRoute path="/fabricant" component={Dashbord}/>
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
