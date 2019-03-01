import React, {Component} from 'react';
import './../../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PostData from './testjson'
import SimpleModal from './modal'
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      root2: {
        flexGrow: 1,
      },
      paper2: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 500,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },

});

class MainGestion extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={10}>
                
            <div className={classes.root}>

                <SimpleModal />
            <Grid container spacing={24}>
              
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>xs=12 sm=6
                        <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={16}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                    Standard license
                                    </Typography>
                                    <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
                                    <Typography color="textSecondary">ID: 1030114</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                                </Grid>
                                </Grid>
                                <Grid item>
                                <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Paper>
                        </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>xs=12 sm=6</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>xs=6 sm=3</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>xs=6 sm=3</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>xs=6 sm=3</Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>xs=6 sm=3</Paper>
              </Grid>
            </Grid>
          </div>
          </Grid>

        );
    }
}

MainGestion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(MainGestion);