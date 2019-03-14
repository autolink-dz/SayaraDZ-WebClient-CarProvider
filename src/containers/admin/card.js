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
import {deleteMarque} from "../../actions/deleteMarque";
import {connect} from "react-redux";
import SnackBar from "../../components/admin/snackBar";
import {putMarque} from "../../actions/putMarque";
import {Redirect} from "react-router-dom";


const styles = {
    card: {
        maxWidth: 200,
        textAlign:'center',
        marginTop:50,
        marginBottom:50,
    },
    media: {
        height: 120,
        width:120,
        marginLeft:'22%',

    },
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
    }
};

class MediaCard extends Component {
    constructor(props)
    {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.gotoFabricant = this.gotoFabricant.bind(this);
        this.state = {
            open: false,
            snack:null,
            redirect:false
        };
    }
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
        this.props.dispatch(deleteMarque(this.props.id));
        if (this.props.loading){

            if(!this.props.error){
                let msg = "La marque est supprimée avec success !\"";
                this.setState({snack:<SnackBar type='success' msg={msg} />});
            }
            else {
                this.setState({snack:<SnackBar type='error' msg='Erreur, veuillez resseyer svp !'/>});
            }
        }
        this.handleClose();
    };

    handleUpdate(){
        this.props.dispatch(putMarque(this.props.id,this.state.nom,this.state.url));
        this.handleClose();
    }
    gotoFabricant() {
        this.setState({
            redirect:true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={'/fabricantAdmin/'+this.props.id} />;
        }
        return (
            <div>
                {this.state.snack}

                <Card style={styles.card} nom={this.props.nom}  >
                    <CardActionArea onClick={this.gotoFabricant}>
                        <CardMedia
                            style={styles.media}
                            image={this.props.url}
                            title="Brand"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.nom}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions style={styles.actions}>
                        <Button size="small" color="primary" style={styles.btn}  onClick={this.handleClickOpen}>
                            <EditIcon style={styles.edit}/> &emsp;&emsp; Modifier
                        </Button>
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
                                //defaultValue={this.props.nom}
                            />
                            <br/>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="url"
                                label="URL"
                                fullWidth
                                onChange={ this.handleUrl }
                                //defaultValue={this.props.url}
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
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        err : state.marquesListReducer.error,
        loading : state.marquesListReducer.loading,
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        deleteMarque,putMarque
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard));