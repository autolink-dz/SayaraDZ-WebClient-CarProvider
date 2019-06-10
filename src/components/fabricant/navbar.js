import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Car from '@material-ui/icons/DirectionsCar';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import Button from '@material-ui/core/Button';
import {getModelesList} from "./../../actions/modeleActions/getModelesList";
import {getVersionsList} from "./../../actions/versionActions/getVersionList";

import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import { Link } from 'react-router-dom'
//import {deleteVersion} from './../../actions/versionActions/deleteVersion'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { allModeles } from '../../actions/modeleActions/allModeles';

const axios = require('axios');

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        marginLeft:'10%'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    icon:{
        marginTop:10
    }
};
var request = require('./../../actions/api/service');
class NavBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        value: 'one',
    };

//////////////////////////////////////////////////////////////////////////
    componentDidMount() {
        console.log("---------------------------")
        this.props.dispatch(getModelesList('0'));
        this.props.dispatch(getVersionsList('0'));
        this.props.dispatch(allModeles());
     //   this.props.dispatch(deleteVersion("hRnfDx2nW1NM6r3ZE4to"));
     
        console.log("----------------------")
        console.log(this.props.versions)
        
    };
    fetchData(){
        this.props.dispatch(getModelesList(this.props.next));
    };
/////////////////////////////////////////////////////////////////////////////
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };
 
    render() {
        const { classes } = this.props;
        const { auth, anchorEl, value } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar>
                
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Tabs value={value} onChange={this.handleChange}>
                          <Tab value="one" label="Dashbord" component={Link} to="/fabricant/dashbord" onClick={this.menuDashbord} />
                          <Tab value="two" label="Gestion" component={Link} to="/fabricant/gestion/modele" />
                          <Tab value="three" label="Stock" component={Link} to="/fabricant/stock" />
                          <Tab value="four" label="Simulation" to="/fabricant/simulation" />
                          <Tab value="five" label="Commande" component={Link} to="/fabricant/commande" />
                          
                        </Tabs>
          
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Car className={classes.icon} /> Sayara
                        </Typography>   
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  et:PropTypes.number
};

function mapStateToProps(state) {
  return {
    versions : state.versionReducer.versions,
    modeles : state.gestionReducer.modeles
  };
}

function matchDispatchToProps(dispatch) {
  let actions =  bindActionCreators({
      
  });
  return { ...actions, dispatch };
}

export default connect(
  mapStateToProps,matchDispatchToProps
)(withStyles(styles)(NavBar));
