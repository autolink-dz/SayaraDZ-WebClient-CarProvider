import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Car from './../../assets/logoWhite.svg'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getModelesList} from "./../../actions/modeleActions/getModelesList";
import { Link } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    icon: {
        height: 35,
        width: 35,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
};

class NavBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        value: localStorage.getItem('value'),
    };

    componentDidMount() {
        this.props.dispatch(getModelesList('0'));
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    handleSignOut = () => {
        this.handleClose();
        localStorage.clear();
        window.location.reload();
    };
 
    render() {
        const { classes } = this.props;
        const { auth, anchorEl, value } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar className={classes.toolbar}>

                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            <img src={Car}  className={classes.icon} alt="img"/>
                            &nbsp;&nbsp;Sayara-DZ
                        </Typography>

                        <Tabs TabIndicatorProps={{
                            style: {
                                backgroundColor: "#ffffff"
                            }
                        }} value={value} onChange={this.handleChange}>
                          <Tab value="one" label="Stock" component={Link} to="/fabricant/stock" />
                          <Tab value="two" label="Simulation" component={Link} to="/fabricant/simulation" />
                          <Tab value="three" label="Commande" component={Link} to="/fabricant/commande" />
                        </Tabs>
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
                                    <MenuItem onClick={this.handleClose}>Mon Compte</MenuItem>
                                    <MenuItem onClick={this.handleSignOut}>Déconnecter</MenuItem>
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
