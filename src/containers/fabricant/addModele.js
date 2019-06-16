import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";

import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';

import CustomizedSnackbars from "./../../components/fabricant/snackBar";

import {addModele} from "./../../actions/modeleActions/addModele";
import {resetAddModele} from "./../../actions/modeleActions/resetAddModele";

import MyForm from "./../../components/fabricant/mains/gestion/gestionModele/OptionsForm";
import CouleursForm from "./../../components/fabricant/mains/gestion/gestionModele/CouleursForm";
import { getFormValues} from 'redux-form'


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
//import {FloatingActionButtons} from "./panelOptions"

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
      },
      card: {
        width:'100%',
        maxWidth: 345,
        
      },
      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
      button: {
        margin: theme.spacing.unit,
      },
      hh:{
        width : 1500,
        
      },
      chip: {
        marginRight: theme.spacing.unit * 20,
      },
      chip2: {
        marginRight: theme.spacing.unit * 15,
      },
});

class AddModele extends React.Component {
    state = {
        open: false,
        name:'',
        url:'',
        code:''
    };
    handleClickOpen = () => {
        
        this.setState({ open: true });
    };

    handleCloseA = () => {
        this.setState({ open: false });
    };
    handleAdd = ()=>{

        if(this.props.options === undefined && this.props.couleurs === undefined)
        {
          this.props.dispatch(addModele(this.state.name,this.state.url,this.state.code,[],[]));
        }
        else if(this.props.options != undefined && this.props.couleurs === undefined)
        {
          this.props.dispatch(addModele(this.state.name,this.state.url,this.state.code,[],this.props.couleurs.couleurs));
        }
        else if(this.props.options === undefined && this.props.couleurs != undefined)
        {
          this.props.dispatch(addModele(this.state.name,this.state.url,this.state.code,this.props.options.options,[]));
        }else
        {
          this.props.dispatch(addModele(this.state.name,this.state.url,this.state.code,this.props.options.options,this.props.couleurs.couleurs));
        }

        this.handleCloseA();
    };
    handleName= (e) =>{
        this.setState({ name: e.target.value });
    };
    handleCode= (e) =>{
        this.setState({ code: e.target.value });
    };
    handleUrl= (e) =>{
        this.setState({ url: e.target.value });
    };

    render() {
        const { classes } = this.props;
        let snack = null;
        if (this.props.add){
           if(!this.props.error){
               let msg = "Modele " +this.state.name+" est ajouté avec success !\"";
               snack = <CustomizedSnackbars type='success' msg={msg} />
           }
           else {
               snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
           }
            this.props.dispatch(resetAddModele())
        }
        return (
            <div >
                {snack}
                <Fab  color="secondary" aria-label="Add" onClick={this.handleClickOpen} position='static' >
                    <AddIcon />
                </Fab>
             { //<FloatingActionButtons/>
             
             }  
             
                <Dialog
                PaperProps={{ style: { maxWidth: 'none' } }}
                className={classes.hh}
                    open={this.state.open}
                //    onClose={this.handleCloseA}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Ajouter un Modele</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veuillez introduire le nom du Modele ainsi que l'url de sa photo
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            onChange={ this.handleName }
                        />
                        <TextField
                            margin="dense"
                            id="code"
                            label="Code"
                            fullWidth
                            onChange={ this.handleCode }
                        />
                        <TextField
                            margin="dense"
                            id="url"
                            label="URL"
                            fullWidth
                            onChange={ this.handleUrl }
                        />

<div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>OPTIONS : </Typography>
          </div>
           
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}> declarer les options</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
        
          <div className={clsx(classes.column, classes.helper)}>
              <MyForm />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque option a un code d'option et le nom de l'option"
          clickable
          className={classes.chip}
          color="primary"
          // onDelete={handleDelete}
          variant="outlined"
        />
          
           
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
                        
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Couleurs : </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}> declarer les couleurs</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
        
          <div className={clsx(classes.column, classes.helper)}>
          <CouleursForm />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque Couleur a un code de couleur et le nom de la couleur"
          clickable
          className={classes.chip2}
          color="primary"
          // onDelete={handleDelete}
          variant="outlined"
        />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>   
                        <hr />
                        
                        {
                            /*
                             <br />
                            <h3>choisir les options</h3>
                            <DialogContent>
                                <OptionsCheck />
                            </DialogContent>
                            
                            */
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseA} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddModele.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state) {
    return {
        add : state.gestionReducer.add,
        error : state.gestionReducer.error,
        options: getFormValues('MyForm')(state),
        couleurs: getFormValues('CouleursForm')(state),
        
    //    couleurs: getFormValues('CouleursForm')(state)
        
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        addModele
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(AddModele));