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
import {putModele} from "./../../../../../actions/modeleActions/putModele";
import {deleteModele} from "./../../../../../actions/modeleActions/deleteModele";
import {resetUpdateModele} from "./../../../../../actions/modeleActions/resetUpdateModele";
import {resetDeleteModele} from "./../../../../../actions/modeleActions/resetDeleteModele";

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
        };
    }
    componentDidMount() {
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
    };
    handleName= (e) =>{
        this.setState({ nom: e.target.value });
    };
    handleUrl= (e) =>{
        this.setState({ url: e.target.value });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete(){
        this.props.dispatch(deleteModele(this.props.id));
        this.handleClose();
    };

    handleUpdate(){
        this.props.dispatch(putModele(this.props.id,this.state.nom,this.state.url));
        
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
                        <img src={this.props.url} alt="brand" style={styles.brand}/>
                        <DialogContent>
                            <DialogContentText>
                                Veuillez introduire le nom du fabricant ainsi que l'url de sa photo
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                
                                label="Name"
                                fullWidth
                                onChange={ this.handleName }
                                defaultValue={this.props.nom}
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
                            {/*<input
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
        err : state.gestionReducer.error,
        loading : state.gestionReducer.loading,
        update : state.gestionReducer.update,
        delete : state.gestionReducer.delete,
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        putModele,deleteModele
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard));