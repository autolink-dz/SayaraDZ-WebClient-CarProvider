import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit'
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {bindActionCreators} from "redux";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import CustomizedSnackbars from "./../../../snackBar";
import {putVersion} from "./../../../../../actions/versionActions/putVersion";
import {deleteVersion} from "./../../../../../actions/versionActions/deleteVersion";
import {resetUpdateVersion} from "./../../../../../actions/versionActions/resetUpdateVersion";
import {resetDeleteVersion} from "./../../../../../actions/versionActions/resetDeleteVersion";
import FichTech from "./FichTechForm";

import SelectModele from './selectModeleUpdate'
import OptionsCheck from './optionsCheckUpdate'
import CouleursCheck from './couleursCheckUpdate'
//import MyForm from './FieldArraysForm'
import { getFormValues} from 'redux-form'
import AlertDialogSlide from './validateDelete'

const styles =  theme =>  ({

    actions:{
        textAlign:'center',
        display:'inline-block',
    },
    edit:{
        margin: 0,
        paddingBottom: 8
    },
    delete:{
        color:'#ff2b58',
    },
    brand:{
        textAlign:'center',
        display:'inline-block',
        margin:'auto',
        height:120,
        width:120,
        paddingBottom: 40
    },
    title:{
        textAlign:'center',
    },
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
      cardLeft:{
        width : 1500,
    //    marginLeft : -theme.spacing.unit * 50,
      },
      cardRight:{
        width : 1500,
        marginRight : -theme.spacing.unit * 50,
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

class MediaCard extends Component {
    constructor(props)
    {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            open: false,
            snack:null,
        //    initialValues: null,
            modele:this.props.idModele,
            options:[],
            couleurs:[],
            optionsChecked:[],
            couleursChecked:[],
            initialValuesFichTech: null,
        };
    }
    componentDidMount() {
     // this.props.dispatch(deleteVersion("X3OmvlSgET7FoOrRARYq"));
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
        this.setState({ code: this.props.code });

        this.setState({ options: this.props.allModeles.find(x => x.id === this.props.idModele).options });
        this.setState({ couleurs: this.props.allModeles.find(x => x.id === this.props.idModele).couleurs });
        this.setState({ optionsChecked: this.props.versionOptions });
        this.setState({ couleursChecked: this.props.versionCouleurs });
        let tt = {aaa : "aaaaaaaa",bbb:"bbbbbb"} 
        let obj = this.props.fiche_tech
        var result = Object.keys(obj).map(function(key) {
          return  {attr:key ,  val: obj[key]}; 
        });
        this.setState({ initialValuesFichTech: {'fiche_tech':result }})
    };

    handleName= (e) =>{
        this.setState({ nom: e.target.value });
    };
    handleCode= (e) =>{
        this.setState({ code: e.target.value });
    };
    
    handleUrl= (e) =>{
        this.setState({ url: e.target.value });
    };
    handleOptions= (e) =>{
      this.setState({ options: this.props.allModeles.find(x => x.id === this.state.modele).options });
      this.setState({ couleurs: this.props.allModeles.find(x => x.id === this.state.modele).couleurs });
    };
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete(){
        this.props.dispatch(deleteVersion(this.props.id));
        this.handleClose();
    };
    handleFichTech= (e) =>{
      let ob={}
        if(this.props.newFichTech.fiche_tech.length > 0){
                   let i=0;
                   for(i=0 ; i<this.props.newFichTech.fiche_tech.length;i++){
                    ob[this.props.newFichTech.fiche_tech[i].attr]=this.props.newFichTech.fiche_tech[i].val;
                   }
            }
            
      this.setState({ initialValuesFichTech: {'fiche_tech':this.props.newFichTech.fiche_tech } })
      setTimeout(()=>{console.log(this.state.initialValuesFichTech)},1000); 
    };
    handleUpdate(){
      
        this.handleFichTech();
        setTimeout(()=>{
          this.props.dispatch(putVersion(this.props.id,this.state.nom,this.state.code,this.state.url,this.state.optionsChecked,this.state.couleursChecked,this.state.initialValuesFichTech.fiche_tech,this.state.modele));
        },1000); 
        this.handleClose();
    }


    handleModele= (m) =>{

        this.setState({ modele: m });
        this.child.clearChecked()
        this.child2.clearChecked()
        
        setTimeout(()=>{this.handleOptions()},1000);
       this.setState({ optionsChecked: [] });
       this.setState({ couleursChecked: [] });
       
    };

    handleOptionsChecked= (array) =>{
        this.setState({ optionsChecked: array });
    };

    handleCouleursChecked= (array) =>{
        this.setState({ couleursChecked: array });
    };

    render() {
        const { classes } = this.props;
        
          
        return (
            
            <Card className={classes.card}>
            
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={this.props.url}
                  title="Contemplative Reptile"
                  onClick={this.props.test.bind(this,this.props.code,this.props.nom,this.props.url,this.props.options,this.props.couleurs,this.props.fiche_tech)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {this.props.nom}
                  </Typography>
                  <Typography component="p">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen}>
                   Modifier
                </Button>
                <AlertDialogSlide nom={this.props.nom} handleDelete={this.handleDelete} btn={0} />
              </CardActions>


              <Dialog
                        PaperProps={{ style: { maxWidth: 'none' } }}
                        className={classes.hh}
                        open={this.state.open}
                        onClose={this.handleCloseA}
                        aria-labelledby="fo"
                       
                    >
                        <h2 style={styles.title}>Modifier la version {this.props.nom}</h2>
                        <DialogContent>
                            <DialogContentText>
                                  Veuillez modifier les information que vous voulez
                            </DialogContentText>
                            <SelectModele handleModele={this.handleModele} allModeles={this.props.allModeles} idModele={this.props.idModele} />


                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                
                                label="Name"
                                fullWidth
                                onChange={ this.handleName }
                                defaultValue={this.props.nom}
                            /><br />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="code"
                                
                                label="Code"
                                fullWidth
                                onChange={ this.handleCode }
                                defaultValue={this.props.code}
                            />
                            
                            <br/>
                            <TextField
                              //  autoFocus
                                margin="dense"
                                id="url"
                                label="URL"
                                fullWidth
                                onChange={ this.handleUrl }
                                defaultValue={this.props.url}
                            />

                             <br /><br /><br />
                            <Chip
                            color="primary"
                             label={<h3>choisir les options</h3>} 
                             variant="outlined" />
                            <DialogContent>
                            <OptionsCheck onRef={ref => (this.child = ref)} modeleOptions={this.props.allModeles.find(x => x.id === this.props.idModele).options} versionOptions={this.props.options}
                            handleOptionsChecked={this.handleOptionsChecked}  />
                            </DialogContent>

                            <br />
                            
                            <br /><br /><br />
                            <Chip
                            color="primary"
                             label={<h3>choisir les couleurs</h3>} 
                             variant="outlined" />

                            <DialogContent>
                            <CouleursCheck onRef={ref => (this.child2 = ref)} modeleCouleurs={this.props.allModeles.find(x => x.id === this.props.idModele).couleurs} versionCouleurs={this.props.couleurs}
                            handleCouleursChecked={this.handleCouleursChecked}  />
                            </DialogContent>

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
            <FichTech initialValues={this.state.initialValuesFichTech}/>
            
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

                        </DialogContent>
                        <DialogActions style={styles.actions}>
                            <Button onClick={this.handleClose} color="default">
                                Cancel
                            </Button>
                            <AlertDialogSlide handleDelete={this.handleDelete} btn={1} />
                            <Button onClick={this.handleUpdate} color="primary">
                                Modifier
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
function mapStateToProps(state) {
    return {
        err : state.versionReducer.error,
        loading : state.versionReducer.loading,
        update : state.versionReducer.update,
        delete : state.versionReducer.delete,
        allModeles : state.gestionReducer.allModeles,
        newFichTech: getFormValues('FichTech')(state),
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        putVersion,deleteVersion
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard));