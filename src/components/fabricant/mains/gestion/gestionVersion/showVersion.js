import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const styles  = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  root2:{
    padding : 20
  },
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    //color: theme.palette.text.secondary,
  },
  image:{
    maxWidth:400,
    maxHeight:400,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ShowVersion extends React.Component {
  state = {
    fich: [],
  }
  componentDidMount() { 
  }
  render() {
    const { classes } = this.props;
    let icon_op =<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {this.props.nom}
              </Typography>
              <Button color="inherit" onClick={this.props.handleClose}>
                fermer
              </Button>
            </Toolbar>
          </AppBar>
              <Grid container className={classes.root2} spacing={24} style={{
                  backgroundColor:'#e5e5ff',
              }}>
                  <Grid container
  direction="row"
  justify="center"
  alignItems="center" item xs={12} sm={4}>
                    <Paper  className={classes.paper}><img className={classes.image} src={this.props.url} alt="brand" /></Paper>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper} >
                      <List>
                        <ListItem >
                          <ListItemText primary={<h1>{this.props.nom}</h1>}/>
                        </ListItem>
                        <Divider />
                        <ListItem >
                          <ListItemText primary={<h3>code de modele : {this.props.code}</h3>} />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Paper className={classes.paper}>
                      
                        <List className={classes.root}>
                        <ListItem alignItems="flex-start">
                        <ListItemText
                              primary={<h2>OPTIONS</h2>}
                            />
                        
                        </ListItem>
                          <Divider />
                        {this.props.options.map( (option,index) =>
                          <div>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {icon_op}
                            </ListItemAvatar>
                            <ListItemText
                              primary={option.nom}
                              secondary={
                                <React.Fragment>
                                   {"code de l'option :"}
                                  <Typography component="span" className={classes.inline} color="textPrimary">
                                    {option.code}
                                  </Typography>
                                
                                </React.Fragment>
                              }
                            />
                           
                          </ListItem>
                          <Divider />
                          </div>
                        )}
                        </List>
                        
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Paper className={classes.paper}>
                        <List className={classes.root}>
                        <ListItem alignItems="flex-start">
                        <ListItemText
                              primary={<h2>COULEURS</h2>}
                            />
                        </ListItem>
                              <Divider />
                            {this.props.couleurs.map( (couleur,index) =>
                              <div>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <div id="color-changer" style={{
                                    background: `${couleur.color }`,
                                    marginTop : 10,
                                    marginLeft:-10,
                                    width:45,
                                    height:45,
                                    borderRadius:15
                                 }}>
                                 </div>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={couleur.nom}
                                  secondary={
                                    <React.Fragment>
                                      {"code de la couleur :"}
                                      <Typography component="span" className={classes.inline} color="textPrimary">
                                        {couleur.code}
                                      </Typography>
                                      <br />
                                      {"hex : "}
                                    <Typography component="span" className={classes.inline} color="textPrimary">
                                      {couleur.color}
                                    </Typography>
                                    </React.Fragment>
                                  }
                                />
                              
                              </ListItem>
                              <Divider />
                              </div>
                            )}
                          </List>
                    </Paper>
                  </Grid>


                  <Grid item xs={6} sm={6}>
                    <Paper className={classes.paper}>
                        <List className={classes.root}>
                        <ListItem alignItems="flex-start">
                        <ListItemText
                              primary={<h2>FICHE TECHNIQUE</h2>}
                            />
                        </ListItem>
                              <Divider />
                            {this.props.fiche_tech.map( (l,index) =>
                              <div>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  {icon_op}
                                </ListItemAvatar>
                                <ListItemText
                                  primary={l.attr}
                                  secondary={
                                    <React.Fragment>
                                      {"code de l'option :"}
                                      <Typography component="span" className={classes.inline} color="textPrimary">
                                        {l.val}
                                      </Typography>
                                    
                                    </React.Fragment>
                                  }
                                />
                              
                              </ListItem>
                              <Divider />
                              </div>
                            )}
                          </List>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={6}>
                  
                  </Grid>  
                  

              </Grid>
        </Dialog>
      </div>
    );
  }
}

ShowVersion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowVersion);
