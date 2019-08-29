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
import TextField from '@material-ui/core/TextField';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {bindActionCreators} from "redux";
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
import {putVersion} from "./../../../../../actions/versionActions/putVersion";
import {deleteVersion} from "./../../../../../actions/versionActions/deleteVersion";
import FichTech from "./FichTechForm";
import OptionsCheck from './optionsCheckUpdate'
import CouleursCheck from './couleursCheckUpdate'
import { getFormValues} from 'redux-form'
import AlertDialogSlide from './validateDelete'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            newValuesFichTech: null,
            file:null,
        };
        this.input1 = React.createRef();
    }
    componentDidMount() {
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
        this.setState({ code: this.props.code });
        this.setState({ options: this.props.allModeles.find(x => x.id === this.props.idModele).options });
        this.setState({ couleurs: this.props.allModeles.find(x => x.id === this.props.idModele).couleurs });
        this.setState({ optionsChecked: this.props.versionOptions });
        this.setState({ couleursChecked: this.props.versionCouleurs });
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
    
    handleUrl = (e) => {
        if (e.target.files[0]){
            this.setState({
                finish : true,
                file : e.target.files[0]
            });
        }
    };
    
    handleClickOpen = () => {
        this.setState({ nom: this.props.nom });
        this.setState({ code: this.props.code });
        this.setState({ open: true });
        this.setState({ url: this.props.url });
        this.setState({ file: null });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCancel = () => {
      this.setState({ open: false });
      this.setState({ nom: this.props.nom });
      this.setState({ url: this.props.url });
      this.setState({ code: this.props.code });
      this.setState({ file: null });

      let obj = this.props.fiche_tech
        var result = Object.keys(obj).map(function(key) {
          return  {attr:key ,  val: obj[key]}; 
        });
        this.setState({ initialValuesFichTech: {'fiche_tech':result }})
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
            
      this.setState({ initialValuesFichTech: this.props.newFichTech })
      this.setState({ newValuesFichTech: {'fiche_tech':ob } })
    };
    handleUpdate(){
        this.setState({ nom: this.nameInput.value });
        this.setState({ code: this.codeInput.value });
        this.handleFichTech();
        let nom = this.nameInput.value;
        let code = this.codeInput.value;
        this.input1.current.value = '';
        let fb = this.props.firebase;
        setTimeout(()=>{
          if(this.state.file != null)
          {
              fb.storage().ref()
                  .child('/images/versions/' + this.state.file.name)
                  .put(this.state.file)
                  .then(() => {
                      fb.storage().ref()
                          .child('/images/versions/' + this.state.file.name)
                          .getDownloadURL()
                          .then((url) => {
                              this.setState({
                                  url,
                                  finish:false
                              });
                              this.props.dispatch(putVersion(this.props.id,nom,code,url,this.state.optionsChecked,this.state.couleursChecked,this.state.newValuesFichTech.fiche_tech,this.state.modele));
                              this.setState({ file: null })
                            })
                  });
          }else{
            this.props.dispatch(putVersion(this.props.id,nom,code,this.props.url,this.state.optionsChecked,this.state.couleursChecked,this.state.newValuesFichTech.fiche_tech,this.state.modele));
          }
        },1000); 
        this.handleClose();
    }

    handleOptionsChecked= (array) =>{
        this.setState({ optionsChecked: array });
    };

    handleCouleursChecked= (array) =>{
        this.setState({ couleursChecked: array });
    };

    render() {
        const { classes } = this.props;
        let obj = this.props.fiche_tech
        var result = Object.keys(obj).map(function(key) {
          return  {attr:key ,  val: obj[key]}; 
        });
          
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
                      <ValidatorForm
                          ref="form"
                          onSubmit={this.handleUpdate}
                          onError={errors => console.log(errors)}
                      >
                        <DialogTitle id="form-dialog-title">Modifier la version {this.props.nom}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                  Veuillez modifier les information que vous voulez
                            </DialogContentText>

                            <TextValidator
                                autoFocus
                                margin="dense"
                                id="name"
                                name="name"
                                inputRef={x => this.nameInput = x}
                                label="Name"
                                fullWidth
                           //     defaultValue={this.props.nom}
                                value={this.state.nom}
                                onChange={this.handleName}
                                validators={['required','matchRegexp:[A-Za-z0-9_*-]']}
                                errorMessages={['Ce champ est obligatoire', 'Vous devez saisir un nom valide']}
                            /><br />
                            <TextValidator
                                margin="dense"
                                id="code"
                                inputRef={x => this.codeInput = x}
                                label="Code"
                                fullWidth
                          //      defaultValue={this.props.code}
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
            <FichTech initialValues={{'fiche_tech':result }}/>
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
                            <Button onClick={this.handleCancel} color="default">
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