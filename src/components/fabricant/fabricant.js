import React, {Component} from 'react';
import NavBar  from './navbar'
import Gestion  from './sidebar/gestion'
import Stock  from './sidebar/stock'
import Main  from './mains/dashbord/main'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modele from './mains/gestion/gestionModele/modele'
import Version from './mains/gestion/gestionVersion/version'
import Versions from './mains/gestion/gestionVersion/versionByModele'

import Option from './mains/gestion/option'
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
   // padding: '0 8px',
   // marginTop:100,
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingTop : theme.spacing.unit * 10,
   
  },
});

class Fabricant extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

    render() {

      const { classes, theme } = this.props;
        let affiche=<Gestion/>
        
        return (
            <div className={classes.root}>
              <CssBaseline />
              <NavBar openMenu={this.state.open} handleDrawerOpen={this.handleDrawerOpen} />

              <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                })}
                classes={{
                  paper: classNames({
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open,
                  }),
                }}
                open={this.state.open}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <Divider />
                  <List>
                      <ListItem button  component={Link} to="/fabricant/gestion/modele">
                        <ListItemIcon> <InboxIcon /></ListItemIcon>
                        <ListItemText primary={'Gérer modele'} />
                      </ListItem>

{/*
<ListItem button  component={Link} to="/fabricant/gestion/version">
                        <ListItemIcon> <InboxIcon /></ListItemIcon>
                        <ListItemText primary={'Gérer version'} />
                      </ListItem>
*/}
                      
                  </List>
                <Divider />
              </Drawer>
              <main className={classes.content}>
                <div className={classNames('main', classes.toolbar)}>
                      <Switch>
                              <Route path='/fabricant/dashbord' render={props =>
                                  <Grid container spacing={24}>
                                      <Main />
                                  </Grid>
                                  } />
                              <Route path='/fabricant/gestion/modele' render={props =>
                                  <Grid container spacing={24}>
                                      <Modele />
                                  </Grid>
                                  } />
                              <Route path='/fabricant/gestion/version' render={props =>
                                  <Grid container spacing={24}>
                                      <Version />
                                  </Grid>
                                  } />

                              <Route exact  path='/fabricant/gestion/versions/:id/:nom' render={props =>
                                    <Grid container spacing={24}>
                                        <Versions {...props}/>
                                    </Grid>
                                  } />
                              
                              <Route path='/fabricant/gestion/option' render={props =>
                                  <Grid container spacing={24}>
                                      <Option />
                                  </Grid>
                                  } />
                              <Route path='/fabricant/gestion/couleur' render={props =>
                                  <Grid container spacing={24}>
                                  </Grid>
                                  } />

                              <Route path='/fabricant/stock' render={props =>
                                  <Grid container spacing={24}>
                                      <Stock />
                                  </Grid>
                                  } />
                              <Route path='/fabricant/simulation' render={props =>
                                  <Grid container spacing={24}>
                                      {affiche}
                                  </Grid>
                                  } />
                              <Route path='/fabricant/commandes' render={props =>
                                  <Grid container spacing={24}>
                                      {affiche}
                                  </Grid>
                                  } />
                      </Switch>
                      </div>
              </main>
            </div>
        );
    }
}

Fabricant.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

Fabricant.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Fabricant);
