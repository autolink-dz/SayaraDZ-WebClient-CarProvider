import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import navbarReducer  from './../../../reducers/navbarReducer'
import {bindActionCreators} from "redux";
import { Link } from 'react-router-dom'
const styles = theme => ({
    main: {
        width:'100%',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,

    },
    paper: {
      //  marginTop: theme.spacing.unit * 8,
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
                    <form className={this.props.classes.form}>
                        <Button key='1' onClick={this.mainModele}>Gérer Modele</Button>
                        <Link color="inherit" to="/fabricant/gestion/modele">Gérer Modele</Link>
                        <hr />
                        <Link color="inherit" to="/fabricant/gestion/version">Gérer Version</Link>
                        <hr />
                        <Link color="inherit" to="/fabricant/gestion/option">Gérer Option</Link>
                        <hr />
                        <Link color="inherit" to="/fabricant/gestion/couleur">Gérer Couleur</Link>
                        <br />
                    </form>
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
        navbarReducer
    });
    return { ...actions, dispatch };
  }
  
  export default connect(
    matchDispatchToProps
  )(withStyles(styles)(Gestion));