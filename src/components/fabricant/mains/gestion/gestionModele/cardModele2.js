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
import {connect} from "react-redux";


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

class MediaCard2 extends Component {
    constructor(props)
    {
        super(props);
     //   this.handleUpdate = this.handleUpdate.bind(this);
     //   this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            open: false,
            snack:null,
        };
    }
  /*  handleName= (e) =>{
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
*/
    render() {

        return (
            <div>
                <Card style={styles.card} nom={this.props.nom} >
                    <CardActionArea>
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

                    
                </Card>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        err : state.gestionReducer.error,
        loading : state.gestionReducer.loading,
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
      
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(MediaCard2));