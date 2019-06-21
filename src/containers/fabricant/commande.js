import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import MaterialTable from 'material-table'
import Block from "../../assets/clear.svg";
import Checked from "../../assets/circle.svg";
import Info from "../../assets/info.svg";
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import Reset from '@material-ui/icons/Clear'
import Edit from '@material-ui/icons/Edit'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from "@material-ui/core/Avatar";
import {getCommandes} from "../../actions/fabricant/getCommandes";
import CircularProgress from '@material-ui/core/CircularProgress';
import {showFabDialog} from "../../actions/admin/showFabDialog";
import CommandDialog from "./commandDialog";
import SnackBar from "../../components/admin/snackBar";
import {resetAddFabricant} from "../../actions/admin/resetAddMarque";

const styles = theme => ({
    root: {
        backgroundColor: '#e5e5e5',
        height: '100vh',
        width: '100%',
        paddingTop: 80,
        margin: 0
    },
});


class Commande extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            id_marque: localStorage.getItem('id_marque'),
            cmd_id: '',
            automobiliste_id: '',
            version_id: ''
        }
    }

    getCmd(id) {
        for (let cmd of this.props.commandes) {
            if (cmd.id === id) return cmd
        }
    }

    componentDidMount() {
        if ( this.props.commandes.length === 0){

            this.props.dispatch(getCommandes(this.state.id_marque));
        }
        this.fetchImage(this.state.id_marque);
        localStorage.setItem('value',"three");
    }

    commandDialog() {
        if (this.props.showCmd) {
            return <CommandDialog
                automobiliste={this.props.automobilistes[this.state.automobiliste_id]}
                version={this.props.versions[this.state.version_id]}
                commande={this.getCmd(this.state.cmd_id)}
            />
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    fetchImage(id) {
        let api = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques/" + id;
        const requestType = new Request(api, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('idToken'),
            }),
        });

        fetch(requestType)
            .then(responseType => {
                if (responseType.status < 200 || responseType.status >= 300) {
                    throw new Error(responseType.statusText);
                }
                return responseType.json();
            })
            .then((responseType) => {
                this.setState({
                    nom: responseType.nom,
                    url: responseType.url,
                })
            })
            .catch((e) => {
                console.log(e);
            });

    }

    loading() {
        let stProgresse = {marginLeft: '45%', marginTop: '15%', height: 100, width: 100};
        return <CircularProgress style={this.props.loading ? {display: 'none'} : stProgresse}/>
    }

    showData() {
        if ((this.props.commandes.length !== 0) && (this.state.url !== '')) {
            return (
                <div>
                    <div style={{textAlign: 'center'}}>
                        <img src={this.state.url} alt="" height="60" width="60"/>
                        <h4>
                            {this.state.nom}
                        </h4>
                    </div>
                    <div>
                        <MaterialTable
                            icons={{
                                Check: Check,
                                DetailPanel: ChevronRight,
                                Export: SaveAlt,
                                Filter: FilterList,
                                FirstPage: FirstPage,
                                LastPage: LastPage,
                                NextPage: ChevronRight,
                                PreviousPage: ChevronLeft,
                                Search: Search,
                                ThirdStateCheck: Remove,
                                ResetSearch: Reset
                            }}
                            columns={[
                                {
                                    title: 'Photo',
                                    field: 'photo',
                                    render: rowData => {
                                        if (rowData.photo != null) {
                                            return (
                                                <Avatar alt={'Logo'} src={rowData.photo}/>
                                            )
                                        } else {
                                            return <AccountCircle/>
                                        }
                                    }

                                },
                                {title: 'Client', field: 'nom',},
                                {title: 'Vehicule', field: 'version'},
                                {title: 'Prix', field: 'prix'},
                                {title: 'Versement', field: 'versement'},
                                {
                                    title: 'État', field: 'etas',
                                    cellStyle: (data) => {
                                        if (data === 'Rejetée')
                                            return {
                                                backgroundImage: `url(${Block})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'left',
                                            };
                                        else if (data === 'Approuvée')
                                            return {
                                                backgroundImage: `url(${Checked})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'left',
                                            };
                                        else if (data === 'En cours')
                                            return {
                                                backgroundImage: `url(${Info})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'left',
                                            };
                                    }
                                },
                            ]}
                            data={this.props.commandes}
                            title="Commandes "
                            options={{
                                actionsColumnIndex: -1,
                                pageSize: 10
                            }}
                            onRowClick={
                                (event, rowData, toggleDetailPanel) => {
                                    this.setState({
                                        cmd_id: rowData.id,
                                        automobiliste_id: rowData.id_automobiliste,
                                        version_id: rowData.id_version,
                                    });
                                    this.props.dispatch(showFabDialog(true));
                                }
                            }
                            actions={[
                                {
                                    icon: Edit,
                                    tooltip: 'Modifier',
                                    onClick: (event, rowData) => {
                                        this.setState({
                                            cmd_id: rowData.id,
                                            automobiliste_id: rowData.id_automobiliste,
                                            version_id: rowData.id_version,
                                        });
                                        this.props.dispatch(showFabDialog(true));
                                    }
                                },
                            ]}
                        />
                    </div>
                </div>
            )
        } else if (this.props.commandes.length === 0 && this.props.loading) {
            return <h1 style={{textAlign: 'center', paddingTop: 250}}>Pas de commandes pour le moment.</h1>;
        }
    }

    render() {
        let snack = null;
        let {classes} = this.props;
        if (this.props.error || this.props.add) {
            if (this.props.add) {
                let msg = "L'opération sur la commande est effectuée avec success !";
                snack = <SnackBar type='success' msg={msg}/>
            } else {
                snack = <SnackBar type='error' msg={this.props.msg}/>
            }
            this.props.dispatch(resetAddFabricant())
        }
        return (
            <div className={classes.root}>
                {snack}
                {this.loading()}
                {this.showData()}
                {this.commandDialog()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.commandesReducer.loading,
        automobilistes: state.commandesReducer.automobilistes,
        versions: state.commandesReducer.versions,
        commandes: state.commandesReducer.commandes,
        showCmd: state.showDialogReducer.showPut,
        add: state.commandesReducer.add,
        error: state.commandesReducer.error,
    };
}

function matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        getCommandes,
        showFabDialog,
        resetAddFabricant,
    });
    return {...actions, dispatch};
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Commande)));