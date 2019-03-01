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
import {bindActionCreators} from "redux";
import {addFabricant} from "../../actions/addFabricant";
import SnackBar from "./snackBar";

class AddFabricant extends React.Component {
    state = {
        open: false,
        name:'',
        url:'',
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleCloseA = () => {
        this.setState({ open: false });
    };

    handleAdd = ()=>{
        this.props.dispatch(addFabricant(this.state.name,this.state.url));
        this.handleCloseA();

    };
    handleName= (e) =>{
        this.setState({ name: e.target.value });
    };
    handleUrl= (e) =>{
        this.setState({ url: e.target.value });
    };

    render() {
        if (this.props.loading.loading){
           if(!this.props.loading.error){
               let msg = "Fabricant" +this.state.name+" est ajouté avec success !\"";
               return <SnackBar type='success' msg={msg} />
           }
           else {
               return <SnackBar type='error' msg='Erreur, veuillez resseyer svp !'/>
           }
        }
        return (
            <div>
                <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} position='static' >
                    <AddIcon />
                </Fab>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseA}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Ajouter un Fabricant</DialogTitle>
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
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="URL"
                            fullWidth
                            onChange={ this.handleUrl }
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

function mapStateToProps(state) {
    return {
        loading : state.addFabricantReducer
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        addFabricant
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(AddFabricant);