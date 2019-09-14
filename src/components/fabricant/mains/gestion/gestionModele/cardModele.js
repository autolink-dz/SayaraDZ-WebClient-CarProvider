import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {putModele} from "./../../../../../actions/modeleActions/putModele";
import {deleteModele} from "./../../../../../actions/modeleActions/deleteModele";
import { getVersionListOfModele } from "./../../../../../actions/versionActions/getVersionListOfModele";
import OptionsForm from './OptionsForm'
import CouleursForm from './CouleursForm'
import { getFormValues} from 'redux-form'
import AlertDialogSlide from './validateDelete'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DialogTitle from '@material-ui/core/DialogTitle';
import classNames from 'classnames';
import red from '@material-ui/core/colors/red';

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
        maxHeight : 200,
        minHeight : 200,
      //  maxWidth : 200,

      },
      button: {
        margin: theme.spacing.unit,
      },
      cardLeft:{
     //   width : 1500,
    //    marginLeft : -theme.spacing.unit * 50,
      },
      cardRight:{
        width : 1500,
        marginRight : -theme.spacing.unit * 50,
      },
      chip: {
        marginRight: theme.spacing.unit * 20,
      },
      chip2: {
        marginRight: theme.spacing.unit * 15,
      },
      cardaction: {
        
      },

      margin: {
        margin: theme.spacing.unit,
      },
      cssRoot: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[900],
        },
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
            initialValues: null,
            initialValuesCouleurs: null,
            file:null,

            openAlert:false,
            messageAlert:""
        };
        this.input1 = React.createRef();
    }
    componentDidMount() {
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
        this.setState({ code: this.props.code });   
    };
    handleName= (e) =>{
        this.setState({ nom: e.target.value });
    };
    handleCode= (e) =>{
        this.setState({ code: e.target.value });
    };
    handleUrl = (e) => {
        if (e.target.files[0]){
            this.setState({
                finish : true,
                file : e.target.files[0]
            });
        }
    };

    handleClickOpen = () => {
        this.setState({ open: true });
        this.setState({ nom: this.props.nom });
        this.setState({ code: this.props.code });
        this.setState({ url: this.props.url });
        this.setState({ file: null });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete(){
        this.props.dispatch(deleteModele(this.props.id));
        this.handleClose();
    };
    test = () => {
      this.props.dispatch(getVersionListOfModele(0,this.props.id));
  };



  handleClickOpenAlert = () => {
    this.setState({ openAlert: true });       
 };

 handleCloseAlert = () => {
  this.setState({ openAlert: false }); 
 };
 
 

  alertError(message){
    const { classes } = this.props;
    return(
      <Dialog
        open={this.state.openAlert}
        onClose={this.handleCloseAlert}
      >

        <DialogTitle id="alert-dialog-slide-title">
          {"Erreur !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" className={classNames(classes.margin, classes.cssRoot)} onClick={this.handleCloseAlert}  >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
  }


  validateOptions(options){
    let i = 0
    let j = 0
        if(options!=undefined){
          for (i = 0; i < options.options.length; i++){
            if(i < options.options.length-1){
              for (j = i+1; j < options.options.length; j++){
                if(options.options[i].nom == options.options[j].nom){
                  this.setState({ openAlert: true }); 
                  this.setState({ messageAlert: "le nom d'option "+options.options[i].nom +" est dupliqué au rang" + (i+1) +" et "+(j+1) }); 
                  return 0
                }
              }
            }
          }
          for (i = 0; i < options.options.length; i++){
            if(i < options.options.length-1){
              for (j = i+1; j < options.options.length; j++){
                if(options.options[i].code == options.options[j].code){
                  this.setState({ openAlert: true }); 
                  this.setState({ messageAlert: "le code d'option "+options.options[i].code +" est dupliqué au rang" + (i+1) +" et "+(j+1) });        
                  return 0
                }
              }
            }
          }
      }

  }

  validateCouleurs(couleurs){
    let i = 0
    let j = 0
        if(couleurs != undefined){
          for (i = 0; i < couleurs.couleurs.length; i++){
            if(i < couleurs.couleurs.length-1){
              for (j = i+1; j < couleurs.couleurs.length; j++){
                if(couleurs.couleurs[i].nom == couleurs.couleurs[j].nom){
                  this.setState({ openAlert: true }); 
                  this.setState({ messageAlert: "le nom de couleur "+couleurs.couleurs[i].nom +" est dupliqué au rang" + (i+1) +" et "+(j+1) }); 
                  return 0
                }
              }
            }
          }


          for (i = 0; i < couleurs.couleurs.length; i++){
            if(i < couleurs.couleurs.length-1){
              for (j = i+1; j < couleurs.couleurs.length; j++){
                if(couleurs.couleurs[i].code == couleurs.couleurs[j].code){
                  this.setState({ openAlert: true }); 
                  this.setState({ messageAlert: "le code de couleur "+couleurs.couleurs[i].code +" est dupliqué au rang" + (i+1) +" et "+(j+1) }); 
                  
                  return 0
                }
              }
            }
          }
          console.log(couleurs)
          for (i = 0; i < couleurs.couleurs.length; i++){
            if(couleurs.couleurs[i].color == undefined || couleurs.couleurs[i].color == ""){
              this.setState({ openAlert: true }); 
              this.setState({ messageAlert: "vous devez préciser la couleur du "+couleurs.couleurs[i].nom + " au rang " + (i+1) });
              return 0
            }
          }
      }
  }



    handleUpdate(){
      this.setState({ nom: this.nameInput.value });
      this.setState({ code: this.codeInput.value });

    let nom = this.nameInput.value;
    let code = this.codeInput.value;
    let newoptions=this.props.newoptions
      let newCouleurs=this.props.newCouleurs

      let break1 = 1;
      let break2 = 1;

      break1 = this.validateOptions(newoptions)
      break2 = this.validateCouleurs(newCouleurs)

      if(break1 == 0 || break2 ==0){
        return
      }

      this.input1.current.value = '';
      let fb = this.props.firebase;
      if(this.state.file != null)
       {
          fb.storage().ref()
              .child('/images/modeles/' + this.state.file.name)
              .put(this.state.file)
              .then(() => {
                  fb.storage().ref()
                      .child('/images/modeles/' + this.state.file.name)
                      .getDownloadURL()
                      .then((url) => {
                          this.setState({
                              url,
                              finish:false
                          });
                          if(newoptions===undefined && newCouleurs===undefined){
                              this.props.dispatch(putModele(this.props.id,nom,code,this.state.url,[],[]));
                          }else if(newoptions!=undefined && newCouleurs===undefined){
                            this.props.dispatch(putModele(this.props.id,nom,code,this.state.url,newoptions.options,[]));
                          }else if(newoptions===undefined && newCouleurs!=undefined){
                            this.props.dispatch(putModele(this.props.id,nom,code,this.state.url,[],newCouleurs.couleurs));
                          }else{
                              this.props.dispatch(putModele(this.props.id,nom,code,this.state.url,newoptions.options,newCouleurs.couleurs));          
                          }
                          this.setState({ file: null })
                      })
              });
       }else{
          if(newoptions==undefined && newCouleurs===undefined){
              this.props.dispatch(putModele(this.props.id,this.nameInput.value,this.codeInput.value,this.props.url,[],[]));
          }else if(newoptions!=undefined && newCouleurs===undefined){
            this.props.dispatch(putModele(this.props.id,this.nameInput.value,this.codeInput.value,this.props.url,this.props.newoptions.options,[]));
          }else if(newoptions===undefined && newCouleurs!=undefined){
            this.props.dispatch(putModele(this.props.id,this.nameInput.value,this.codeInput.value,this.props.url,[],this.props.newCouleurs.couleurs));
          }else{
              this.props.dispatch(putModele(this.props.id,this.nameInput.value,this.codeInput.value,this.props.url,this.props.newoptions.options,this.props.newCouleurs.couleurs));
          }
       }       
      this.handleClose();
  }

    render() {
        const { classes } = this.props;      
        return (
            <Card className={classes.card}>
              <CardActionArea className={classes.cardaction} >
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={this.props.url}
                  title="Contemplative Reptile"
                  onClick={this.props.test.bind(this,this.props.code,this.props.nom,this.props.url,this.props.options,this.props.couleurs)}
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
                <Button component={Link} to={"/fabricant/gestion/versions/"+this.props.id+"/"+this.props.nom} onClick={this.test} size="small" variant="contained" color="secondary" className={classes.button} style={
                                    {
                                        backgroundColor: '#3EB741',
                                        color: '#FFF',
                                    }
                                }>
                   versions
                </Button>
                <Button size="small" variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen}>
                   Modifier
                </Button>
                <AlertDialogSlide nom={this.props.nom} handleDelete={this.handleDelete} btn={0} />
              </CardActions>
              <Dialog
                        PaperProps={{ style: { maxWidth: 'none' } }}
                        className={classes.cardLeft}
                        open={this.state.open}
                   //     onClose={this.handleCloseA}
                        aria-labelledby="fo"     
                    >
                  <ValidatorForm
                      ref="form"
                      onSubmit={this.handleUpdate}
                      onError={errors => console.log(errors)}
                  >
                        <DialogTitle id="form-dialog-title">Modifier Le modele {this.props.nom}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Veuillez modifier les information que vous voulez
                            </DialogContentText>
                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                fullWidth
                                inputRef={x => this.nameInput = x}
                              //  defaultValue={this.props.nom}
                                value={this.state.nom}
                                onChange={this.handleName}
                                validators={['required','matchRegexp:[A-Za-z0-9_*-]']}
                                errorMessages={['Ce champ est obligatoire', 'Vous devez saisir un nom valide']}
                            />
                            <br/>
                            <TextValidator
                                margin="dense"
                                id="code"
                                label="Code"
                                fullWidth
                                inputRef={x => this.codeInput = x}
                             //   defaultValue={this.props.code}
                                value={this.state.code}
                                onChange={this.handleCode}
                                validators={['required', 'matchRegexp:[A-Za-z0-9_*-]']}
                                errorMessages={['Ce champ est obligatoire', 'Vous devez saisir un code valide']}
                            />
                            
                            <br/>
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                style={{display: 'none'}}
                                onChange={this.handleUrl}
                                ref={this.input1}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" style={
                                    {
                                        justifyContent: 'center',
                                        marginLeft: '34%',
                                        marginTop: '10%',
                                        padding:5,
                                        backgroundColor: '#3EB741',
                                        color: '#FFF',
                                    }
                                }>
                                    Upload Photo
                                </Button>
                            </label>
                            
                    
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
            <OptionsForm initialValues={{'options':this.props.options }}/>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque option doit avoir un code d'option et le nom de l'option"
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
            <CouleursForm initialValues={{'couleurs':this.props.couleurs }} />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
        <Chip
          avatar={<Avatar>Rq</Avatar>}
          label="Chaque Couleur doit avoir un code de couleur et le nom de la couleur"
          clickable
          className={classes.chip2}
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
                            <Button type="submit" color="primary"
                                    style={{color: '#3EB741',}}>
                                Modifier
                            </Button>
                        </DialogActions>
                  </ValidatorForm>
                    </Dialog>
                    {this.alertError(this.state.messageAlert)}
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
function mapStateToProps(state) {
    return {
        err : state.gestionReducer.error,
        loading : state.gestionReducer.loading,
        update : state.gestionReducer.update,
        delete : state.gestionReducer.delete,
        newoptions: getFormValues('OptionsForm')(state),
        newCouleurs: getFormValues('CouleursForm')(state),
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        putModele,deleteModele,getVersionListOfModele
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard));