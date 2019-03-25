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
import CustomizedSnackbars from "./../../components/fabricant/snackBar";
import OptionsCheck from "./../../components/fabricant/mains/gestion/gestionModele/optionsCheck";

import {addModele} from "./../../actions/modeleActions/addModele";
import {resetAddModele} from "./../../actions/modeleActions/resetAddModele";



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
        this.props.dispatch(addModele(this.state.name,this.state.url,this.state.code));
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseA}
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

function mapStateToProps(state) {
    return {
        add : state.gestionReducer.add,
        error : state.gestionReducer.error
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
)(AddModele);