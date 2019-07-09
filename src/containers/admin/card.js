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
import {deleteMarque} from "../../actions/admin/deleteMarque";
import {connect} from "react-redux";
import SnackBar from "../../components/admin/snackBar";
import {putMarque} from "../../actions/admin/putMarque";
import {Redirect, withRouter} from "react-router-dom";


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
            redirect:false,
            file:null,
        };
        this.input1 = React.createRef();
    }
    handleName= (e) =>{
        this.setState({ nom: e.target.value });
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
        this.input1.current.value = '';
        let fb = this.props.firebase;
        fb.storage().ref()
            .child('/images/marques/' + this.state.file.name)
            .put(this.state.file)
            .then(() => {
                fb.storage().ref()
                    .child('/images/marques/' + this.state.file.name)
                    .getDownloadURL()
                    .then((url) => {
                        this.setState({
                            url,
                            finish:false
                        });
                        this.props.dispatch(putMarque(this.props.id,this.state.nom,this.state.url));
                    })
            });
        this.handleClose();
    }
    gotoFabricant() {
        this.setState({
            redirect:true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={'/admin/'+this.props.id} />;
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
                                Veuillez introduire le nom du fabricant ainsi que sa photo
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

export default withRouter(connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard)));