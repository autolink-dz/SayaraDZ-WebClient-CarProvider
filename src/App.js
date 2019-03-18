import React, { Component } from 'react';
import './App.css';
import SignInUi from "./components/signIn/signInUI";
import Admin from './components/admin/admin';
import Fabricant from './components/fabricant/fabricant';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {PrivateRoute} from './utils/privateRoute'
import {createMuiTheme} from "@material-ui/core";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import FabricantAdmin from "./components/admin/fabricantAdmin";

const theme = createMuiTheme({
  palette: {
    primary: { main: '#158CF6' },
    secondary: { main: '#158CF6' }
  },
  typography: { useNextVariants: true },
});

class App extends Component {
  render() {
    return (
      <div>
          <MuiThemeProvider theme={theme}>
            <Router>
                <Switch>
                  <PrivateRoute path="/admin/:id" component={FabricantAdmin}/>
                  <PrivateRoute path='/admin' component={Admin} />
                  <PrivateRoute path="/fabricant" component={Fabricant} />
                  <Route component={SignInUi} />
                  <Route path="/" component={SignInUi} exact />
                </Switch>
            </Router>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
