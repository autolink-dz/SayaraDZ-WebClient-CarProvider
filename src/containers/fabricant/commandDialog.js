import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CommandIcon from '@material-ui/icons/ReceiptOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CarIcon from '@material-ui/icons/DirectionsCar'
import {bindActionCreators} from "redux";
import {showFabDialog} from "../../actions/admin/showFabDialog";
import {TableBody, withStyles} from "@material-ui/core";
import {resetAddFabricant} from "../../actions/admin/resetAddMarque";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {putCommande} from "../../actions/fabricant/putCommande";


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
        color:'#fff',
        backgroundColor: '#ff2b58',
        marginRight:50,
        marginLeft:50,
    },
    cancel: {
        backgroundColor: '#4e534d',
        color:'#fff',
    },
    title: {
        textAlign: 'center',
    },
    h3: {
        marginTop: 0,
        paddingBottom: 10,
        borderBottom: '1px #BCC5D3 solid'
    },
    expandTitle: {
        display: 'inline-flex',
        verticalAlign: 'midlle',
        paddingRight: 5,
        fontSize: 16
    },
    icon: {
        paddingRight: 5
    },
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

    handleAccept = () => {
        this.props.dispatch(putCommande(2,this.props.commande.id));
        this.handleCloseA();
    };

    handleReject = () => {
        this.props.dispatch(putCommande(0,this.props.commande.id));
        this.handleCloseA();
    };

    displayAction(){
        if(this.props.commande.etas==='En cours') {
            return (
                <div>
                    <DialogActions style={styles.actions}>
                        <Button variant="outlined"  onClick={this.handleCloseA} >
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.handleReject}
                                style={styles.enable}>
                            Rejeter
                        </Button>
                        <Button variant="contained" onClick={this.handleAccept} color="primary">
                            Accepter
                        </Button>
                    </DialogActions>
                </div>
            )
        }
    }

    render() {

        return (
            <div>
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

                        {/* INFO COMMANDE */}
                        <ExpansionPanel style={{backgroundColor:'#E0E0E0'}} defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography style={styles.expandTitle}>
                                    <CommandIcon style={styles.icon}/>
                                    Commande
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Date Commande :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.commande.date}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                Prix :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.commande.prix}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                versement :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.commande.versement}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                Etat :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.commande.etas}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/* INFO Automobiliste */}

                        <ExpansionPanel style={{backgroundColor:'#E0E0E0'}}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography style={styles.expandTitle}>
                                    <AccountCircleIcon style={styles.icon}/>
                                    Client
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Nom :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.automobiliste.nom}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                Email :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.automobiliste.email}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                Message :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.commande.message}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/* INFO Version */}

                        <ExpansionPanel tyle={{backgroundColor:'#E0E0E0'}}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography style={styles.expandTitle}>
                                    <CarIcon style={styles.icon}/>
                                    Véhicule
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Version :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.version.nom}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Boite :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.version.fiche_tech.Boite}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>
                                                Moteur :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.version.fiche_tech.Moteur}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow >
                                            <TableCell>
                                                Reservoir :
                                            </TableCell>
                                            <TableCell>
                                                {this.props.version.fiche_tech.Reservoir}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </DialogContent>
                    {this.displayAction()}
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        add: state.commandesReducer.add,
        error: state.commandesReducer.error,
    };
}

function matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        resetAddFabricant,
        putCommande
    });
    return {...actions, dispatch};
}

export default connect(
    mapStateToProps, matchDispatchToProps
)(withStyles(styles)(CommandDialog));