import React, {Component} from 'react';
import './../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

import EnhancedTable  from './table'


const styles = theme => ({
    main: {
        width:'100%',
        height:'100%',
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
        height:'100%'
    },
});

class Main extends Component {
    render() {
        return (
        <Grid item xs={10}>
          <main className={this.props.classes.main}>
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Typography component="h1" variant="h5">
                       Modele
                    </Typography><br/>
                    <EnhancedTable />

                </Paper>
            </main>
        </Grid>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Main);