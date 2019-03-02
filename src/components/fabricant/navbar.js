import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import navbarReducer  from './../../reducers/navbarReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DataModele from './../../fichier_json/modele.json'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  btn: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit *0.1,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  btns: {
    marginLeft: '5%',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  menuDashbord = () => {
    this.props.dispatch({type : 'DASHBORD', payload:{
      etat : 0
    }})
  };
  menuGestion = () => {
    this.props.dispatch({type : 'GESTION', payload:{
      etat : 1
    }})
  };
  menuStock = () => {
    this.props.dispatch({type : 'STOCK', payload:{
      etat : 2
    }})
  };
  menuSimulation = () => {
    this.props.dispatch({type : 'SIMULATION', payload:{
      etat : 3
    }})
  };
  menuCommande = () => {
    this.props.dispatch({type : 'COMMANDE', payload:{
      etat : 4
    }})
  };
 /* getModel = () => {
    console.log(this.props.marques)
    let url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques?next=0&fbclid=IwAR0Vn2F_tAbL-kIIl0sT8OD8l-FqoTes1QaWkcCEGhr6fDow04EcaCIA_i0"
               const requestType = new Request(url, {
                    method: 'GET',
                });
                fetch(requestType)
                    .then(responseType => {
                    if (responseType.status < 200 || responseType.status >= 300) {
                        throw new Error(responseType.statusText);
                    }
                    return responseType.json();
                    })
                    .then((responseType) => {
                     //  console.log(responseType.data) 
                       this.props.dispatch({type : 'SELECT_MARQUES', payload: responseType.data})
                       console.log(this.props.marques)
                      // datas = Array.from(this.props.marques)
                  })
  }
*/

 getModel = () => {
    this.props.dispatch({type : 'SELECT_MODELES', payload: DataModele.data})
    const datas = Array.from(DataModele.data)
    console.log(datas)
    return datas
  }
  menuGestionjson = () =>{
    this.menuGestion();
    this.getModel();
  }
  
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
               <Button color="inherit" className={classes.btn} onClick={this.menuDashbord}>Dashbord</Button>
           <div className={classes.btns}>
              <Button className={classes.btn} color="inherit" onClick={this.menuGestionjson}>Gestion</Button>
              <Button className={classes.btn} color="inherit" onClick={this.menuStock}>Stock</Button>
              <Button className={classes.btn} color="inherit" onClick={this.menuSimulation}>Simulation</Button>
              <Button className={classes.btn} color="inherit" onClick={this.menuCommande}>Commande</Button> 
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
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
      navbarReducer
  });
  return { ...actions, dispatch };
}

export default connect(
  mapStateToProps,matchDispatchToProps
)(withStyles(styles)(NavBar));