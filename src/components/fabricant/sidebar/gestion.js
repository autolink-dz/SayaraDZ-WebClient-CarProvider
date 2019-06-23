import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import { Link } from 'react-router-dom'
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    main: {
        width:'100%',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        height:550
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: '#393A7E'
    },
    menuItem: {
      
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {marginLeft: '-25%',},
    icon: {},
});
class Gestion extends React.Component {  
  render() {
    return (
        <Grid item xs={2}>
            <main className={this.props.classes.main}>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Typography component="h1" variant="h5">
                       Menu
                    </Typography><br/>
                    <MenuList >
                      <MenuItem className={this.props.classes.menuItem} component={Link} to="/fabricant/gestion/modele">
                        <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Gérer modele" />
                      </MenuItem>                   
                      <MenuItem className={this.props.classes.menuItem} component={Link} to="/fabricant/gestion/version">
                        <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Gérer version" />
                      </MenuItem>
                      <MenuItem className={this.props.classes.menuItem} component={Link} to="/fabricant/gestion/option">
                        <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Gérer option" />
                      </MenuItem>
                      <MenuItem className={this.props.classes.menuItem} component={Link} to="/fabricant/gestion/couleur">
                        <ListItemText classes={{ primary: this.props.classes.primary }} inset primary="Gérer couleur" />
                      </MenuItem>
                    </MenuList>
                </Paper>
            </main>
        </Grid>
    );
  }
}

Gestion.propTypes = {
  classes: PropTypes.object.isRequired,
};

function matchDispatchToProps(dispatch) {
  let actions =  bindActionCreators({
  });
  return { ...actions, dispatch };
}

export default connect(
  matchDispatchToProps
)(withStyles(styles)(Gestion));