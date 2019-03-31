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
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";


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
    },
    h3:{
        marginTop:0,
        paddingBottom:10,
        borderBottom:'1px grey solid'
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
        console.log(this.props);
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
                    scroll='body'
                    maxWidth='sm'
                >
                    <DialogContent>
                        <div style={styles.title}>
                            <img src={this.props.version.url} alt="car photo" width="240" height="200"/>
                            <h3 style={styles.h3}>{this.props.version.nom}</h3>
                        </div>
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Expansion Panel 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Expansion Panel 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Expansion Panel 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

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