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
import {addMarque} from "../../actions/admin/addMarque";
import SnackBar from "../../components/admin/snackBar";
import {resetAddFabricant} from "../../actions/admin/resetAddMarque";
import Cirlce from '@material-ui/icons/DirectionsCar'


class AddMarque extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            url: '',
            file: null,
            finish:false
        };
        this.input1 = React.createRef();
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleCloseA = () => {
        this.setState({open: false});
    };
    handleAdd = () => {
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
                        this.props.dispatch(addMarque(this.state.name, this.state.url));
                    })
            });
        this.handleCloseA();
    };

    handleName = (e) => {
        this.setState({name: e.target.value});
    };

    handleUrl = (e) => {
        if (e.target.files[0]){
            this.setState({
                finish : true,
                file : e.target.files[0]
            });
        }
    };

    render() {
        let snack = null;
        if (this.props.add) {
            if (!this.props.error) {
                let msg = "Fabricant " + this.state.name + " est ajouté avec success !\"";
                snack = <SnackBar type='success' msg={msg}/>
            } else {
                snack = <SnackBar type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
            this.props.dispatch(resetAddFabricant())
        }
        return (
            <div>
                {snack}
                <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} position='static'>
                    <AddIcon/>
                </Fab>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseA}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={{textAlign: 'center'}}>
                        <Cirlce fontSize='large'/>
                        <DialogTitle id="form-dialog-title">Ajouter une Marque</DialogTitle>
                    </div>
                    <DialogContent>
                        <DialogContentText>
                            Veuillez introduire le nom de la marque ainsi que la photo
                        </DialogContentText>
                        <br/><br/>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Nom"
                            label="Nom"
                            fullWidth
                            onChange={this.handleName}
                            autoComplete='off'
                            variant='outlined'
                        />
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
                    <DialogActions >
                        <Button variant={"outlined"} onClick={this.handleCloseA} color="primary" style={{marginRight:'65%'}}>
                            Cancel
                        </Button>
                        <Button  variant={"outlined"} onClick={this.handleAdd} color="primary" disabled={!this.state.finish}>
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
        add: state.marquesListReducer.add,
        error: state.marquesListReducer.error
    };
}

function matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        addMarque, resetAddFabricant
    });
    return {...actions, dispatch};
}

export default connect(
    mapStateToProps, matchDispatchToProps
)(AddMarque);