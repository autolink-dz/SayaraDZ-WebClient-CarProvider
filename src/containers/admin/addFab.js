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
import Cirlce from '@material-ui/icons/AccountCircle'
import Fab from '@material-ui/core/Fab';
import {bindActionCreators} from "redux";
import SnackBar from "../../components/admin/snackBar";
import {resetAddFabricant} from "../../actions/admin/resetAddMarque";
import {addFab} from "../../actions/admin/addFab";


class AddFab extends React.Component {
    state = {
        open: false,
        name:'',
        prenom:'',
        password:'',
        mail:'',
        adresse:'',
        phone:'',
        id_marque:this.props.id_marque

    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleCloseA = () => {
        this.setState({ open: false });
    };
    handleAdd = ()=>{
        this.props.dispatch(addFab(this.state.name,this.state.prenom , this.state.password , this.state.mail , this.state.adresse , this.state.phone , this.state.id_marque ));
        this.handleCloseA();
    };
    handleName= (e) =>{
        this.setState({ name: e.target.value });
    };
    handlePrenom= (e) =>{
        this.setState({ prenom: e.target.value });
    };
    handleEmail= (e) =>{
        this.setState({ mail: e.target.value });
    };
    handlePassword= (e) =>{
        this.setState({ password: e.target.value });
    };
    handleAdresse= (e) =>{
        this.setState({ adresse: e.target.value });
    };
    handlePhone= (e) =>{
        this.setState({ phone: e.target.value });
    };


    render() {
        let snack = null;
        if (this.props.error || this.props.add){
           if(this.props.add ){
               let msg = "Fabricant " +this.state.name+" est ajouté avec success !\"";
               snack = <SnackBar type='success' msg={msg} />
           }
           else {
               snack = <SnackBar type='error' msg={this.props.msg}/>
           }
            this.props.dispatch(resetAddFabricant())
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
                    <DialogContent>
                        <div style={{textAlign:'center'}}>
                            <Cirlce fontSize='large' />
                            <DialogTitle id="form-dialog-title">Ajouter un Fabricant</DialogTitle>
                        </div>
                        <DialogContentText>
                            Veuillez introduire les informations concernant le fabricant
                        </DialogContentText>
                        <br/>
                        <TextField
                            autoComplete='off'
                            variant='outlined'
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nom"
                            fullWidth
                            onChange={ this.handleName }
                            required={true}
                        />
                        <TextField
                            autoComplete='off'
                            variant='outlined'
                            margin="dense"
                            id="prenom"
                            label="prenom"
                            fullWidth
                            onChange={ this.handlePrenom }
                            required={true}
                        />
                        <TextField
                            autoComplete='off'
                            variant='outlined'
                            margin="dense"
                            id="mail"
                            label="Email"
                            fullWidth
                            onChange={ this.handleEmail }
                            required={true}
                        />
                        <TextField
                            autoComplete='off'
                            inputProps={{
                                minLength:8
                            }}
                            variant='outlined'
                            margin="dense"
                            id="password"
                            label="Mot de Passe"
                            fullWidth
                            onChange={ this.handlePassword }
                            type='password'
                            required={true}
                        />
                        <TextField
                            autoComplete='off'
                            inputProps={{
                                maxLength: 20,
                            }}
                            variant='outlined'
                            margin="dense"
                            id="Adresse"
                            label="Adresse"
                            fullWidth
                            onChange={ this.handleAdresse }
                            required={true}
                        />
                        <TextField
                            autoComplete='off'
                            inputProps={{
                                maxLength: 12,
                            }}
                            variant='outlined'
                            margin="dense"
                            id="phone"
                            label="Téléphone"
                            fullWidth
                            onChange={ this.handlePhone }
                            required={true}
                        />

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
        add : state.fabAdminListReducer.add,
        error : state.fabAdminListReducer.error,
        msg : state.fabAdminListReducer.msg
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        addFab,resetAddFabricant
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(AddFab);