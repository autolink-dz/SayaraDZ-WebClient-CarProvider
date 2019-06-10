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

import PropTypes from 'prop-types';

import CustomizedSnackbars from "./../../../snackBar";
import {putVersion} from "./../../../../../actions/versionActions/putVersion";
import {deleteVersion} from "./../../../../../actions/versionActions/deleteVersion";
import {resetUpdateVersion} from "./../../../../../actions/versionActions/resetUpdateVersion";
import {resetDeleteVersion} from "./../../../../../actions/versionActions/resetDeleteVersion";


import SelectModele from './selectModeleUpdate'
import OptionsCheck from './optionsCheckUpdate'
import CouleursCheck from './couleursCheckUpdate'
//import MyForm from './FieldArraysForm'
import { getFormValues} from 'redux-form'

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
            modele:this.props.idModele,
            options:[],
            couleurs:[],
            optionsChecked:[],
            couleursChecked:[],
        };
    }
    componentDidMount() {
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
        this.setState({ code: this.props.code });

        this.setState({ options: this.props.allModeles.find(x => x.id === this.props.idModele).options });
        this.setState({ couleurs: this.props.allModeles.find(x => x.id === this.props.idModele).couleurs });
        this.setState({ optionsChecked: this.props.versionOptions });
        this.setState({ couleursChecked: this.props.versionCouleurs });
    //    this.setState({ initialValues: {'options':[{'code':'Axl Rose', 'nom':'Brian Johnson'}]} });
    //  this.setState({ initialValues: {'options':this.props.options }})
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
      //  this.setState({ initialValues: {'options':this.props.newoptions.options } });
      
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

    handleUpdate(){

            this.props.dispatch(putVersion(this.props.id,this.state.nom,this.state.code,this.state.url,this.state.optionsChecked,this.state.couleursChecked,this.state.modele));
        
    /*    if (this.props.loading){

            if(!this.props.error){console.log(this.props.loading)
                let msg = "La marque est modifieé avec success !\"";
                this.setState({snack:<CustomizedSnackbars type='success' msg={msg} />});
            }
            else {
                this.setState({snack:<CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>});
            }
        }*/
        this.handleClose();
    }


    handleModele= (m) =>{

        this.setState({ modele: m });
        this.child.clearChecked()
        this.child2.clearChecked()
        
        setTimeout(()=>{this.handleOptions()},1000);
       /// setTimeout(()=>{this.setState({ optionsChecked: [] });},1000);
       this.setState({ optionsChecked: [] });
       this.setState({ couleursChecked: [] });
       
     //   this.handleOptions()
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
                <IconButton aria-label="Delete" className={classes.margin} onClick={this.handleDelete}>
                <DeleteIcon fontSize="large" />
                </IconButton>
              </CardActions>


              <Dialog
                        open={this.state.open}
                        onClose={this.handleCloseA}
                        aria-labelledby="fo"
                       
                    >
                        <h2 style={styles.title}>Modifier La Marque {this.props.nom}</h2>
                        <img src={this.props.url} alt="brand" style={styles.brand} height="200"/>
                        <DialogContent>
                            <DialogContentText>
                                Veuillez introduire le nom du fabricant ainsi que l'url de sa photo
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

                            <br />
                            <h3>choisir les options</h3>
     
                            <DialogContent>
                            <OptionsCheck onRef={ref => (this.child = ref)} modeleOptions={this.state.options} versionOptions={this.props.options}
                            handleOptionsChecked={this.handleOptionsChecked}  />
                            </DialogContent>

                            <br />
                            <h3>choisir les couleurs</h3>
                            <DialogContent>
                            <CouleursCheck onRef={ref => (this.child2 = ref)} modeleCouleurs={this.state.couleurs} versionCouleurs={this.props.couleurs}
                            handleCouleursChecked={this.handleCouleursChecked}  />
                            </DialogContent>
                            
                            
                            {/*
                            <MyForm initialValues={this.state.initialValues} />
                            
                            <MyForm initialValues={this.props.options} />
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{display:'none'}}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" >
                                    Upload
                                </Button>
                            </label>*/}
                        </DialogContent>
                        <DialogActions style={styles.actions}>
                            <Button onClick={this.handleClose} color="default">
                                Cancel
                            </Button>
                            <Button onClick={this.handleDelete} style={styles.delete}>
                                Delete
                            </Button>
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
    //    newoptions: getFormValues('MyForm')(state),
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