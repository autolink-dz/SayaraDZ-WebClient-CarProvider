import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cirlce from '@material-ui/icons/AccountCircle'
import {bindActionCreators} from "redux";
import SnackBar from "../../components/admin/snackBar";
import {showFabDialog} from "../../actions/admin/showFabDialog";
import {withStyles} from "@material-ui/core";
import {resetAddFabricant} from "../../actions/admin/resetAddMarque";


const styles = {
    dialog: {
        textAlign: 'center',
    },
    actions: {
        textAlign: 'center',
        display: 'inline-block',
    },
    edit: {
        margin: 0,
        paddingBottom: 8
    },
    enable: {
        color: '#ff2b58',
    },
    disable: {
        color: '#27B863',
    },
    cancel: {
        color: '#4e534d',
    },
    title: {
        textAlign: 'center',
    }
};

class CommandDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidMount() {
        this.handleClickOpen();
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleCloseA = () => {
        this.setState({open: false});
        this.props.dispatch(showFabDialog(false));
    };

    handleUpdate = () => {
        //this.props.dispatch(putFab(this.state.id,this.state.nom,this.state.prenom , this.state.mdp , this.state.mail , this.state.adresse , this.state.num_tlp , this.state.disabled));
        this.handleCloseA();
    };

    handleDisable = () => {
        //this.props.dispatch(putFab(this.state.id,this.state.nom,this.state.prenom , this.state.mdp , this.state.mail , this.state.adresse , this.state.num_tlp , !this.state.disabled));
        this.handleCloseA();
    };

    handleName = (e) => {
        this.setState({nom: e.target.value});
    };

    handlePrenom = (e) => {
        this.setState({prenom: e.target.value});
    };

    handleEmail = (e) => {
        this.setState({mail: e.target.value});
    };

    handlePassword = (e) => {
        this.setState({mdp: e.target.value});
    };

    handleAdresse = (e) => {
        this.setState({adresse: e.target.value});
    };

    handlePhone = (e) => {
        this.setState({num_tlp: e.target.value});
    };


    render() {
        let snack = null;
        if (this.props.error || this.props.add) {
            if (this.props.add) {
                let msg = "Fabricant " + this.state.nom + " est modifié avec success !\"";
                snack = <SnackBar type='success' msg={msg}/>
            } else {
                snack = <SnackBar type='error' msg={this.props.msg}/>
            }
            this.props.dispatch(resetAddFabricant())
        }
        return (
            <div>
                {snack}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseA}
                    aria-labelledby="form-dialog-title"
                    style={styles.dialog}
                >
                    <DialogContent>
                        <div style={styles.title}>
                            <Cirlce fontSize='large'/>
                            <DialogTitle id="form-dialog-title">Modifier un Fabricant</DialogTitle>
                        </div>
                        <DialogContentText>
                            Veuillez introduire les informations concernant le fabricant
                        </DialogContentText>
                        <br/>

                    </DialogContent>
                    <div style={styles.dialog}>
                        <DialogActions style={styles.actions}>
                            <Button onClick={this.handleCloseA} style={styles.cancel}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleDisable}
                                    style={this.props.disabled ? styles.disable : styles.enable}>
                                {this.props.disabled ? " Activer" : "Désactiver"}
                            </Button>
                            <Button onClick={this.handleUpdate} color="primary">
                                Modifier
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        resetAddFabricant
    });
    return {...actions, dispatch};
}

export default connect(
    mapStateToProps, matchDispatchToProps
)(withStyles(styles)(CommandDialog));