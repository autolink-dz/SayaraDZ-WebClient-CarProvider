import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

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

  function Com(props) {
    const state = {
        commande : [
            {id: 1 ,name:"Commande1"},
            {id: 2 ,name:"Commande2"},
            {id: 3 ,name:"Commande3"}
        ]
    }
    return (
        state.commande.map(item => (
            <div>
            <Button key={item.id}>{item.name}</Button>
            </div>
        ))
    );
  }

class Commande extends React.Component {
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
                        <Com/>
                        <br />
                    </form>
                </Paper>
            </main>
        </Grid>
    );
  }
}

Commande.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Commande);