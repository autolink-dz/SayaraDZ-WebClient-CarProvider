import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import MaterialTable from 'material-table'
import Block from "../../assets/clear.svg";
import Checked from "../../assets/circle.svg";
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
import Supprimer from '@material-ui/icons/Close'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Avatar from "@material-ui/core/Avatar";
import {getCommandes} from "../../actions/fabricant/getCommandes";
import CircularProgress from '@material-ui/core/CircularProgress';
import {showFabDialog} from "../../actions/admin/showFabDialog";
import PutFab from "../admin/mainFabricants";
import CommandDialog from "./commandDialog";

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
            nom: '',
            url: '',
            cmdArray: [],
            open: false,
            id_marque: localStorage.getItem('id_marque')
        }
    }

    componentDidMount() {
        this.fetchImage(this.state.id_marque);
        this.props.dispatch(getCommandes(this.state.id_marque));
    }

    commandDialog() {
        if (this.props.showPut) {
            return (<CommandDialog

            />)
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
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

    getData() {
        if ((this.props.cmdArray.length !== 0) && (this.state.url !== '')) {
            let cmdArray = [];
            cmdArray.push(...this.props.cmdArray);
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
                                    title: 'Avatar',
                                    field: 'avatar',
                                    render: rowData => {
                                        //TODO : VERIFY URL !
                                        if (rowData) {
                                            return (
                                                <Avatar alt={'Logo'} src={this.state.url}/>
                                            )
                                        } else {
                                            return <AccountCircle/>
                                        }
                                    }

                                },
                                {title: 'Automobilist', field: 'nom',},
                                {title: 'Vehicule(nom version)', field: 'version'},
                                {title: 'Prix', field: 'prix', type: 'currency'},
                                {
                                    title: 'État', field: 'disabled',
                                    cellStyle: (data) => {
                                        if (data)
                                            return {
                                                backgroundImage: `url(${Block})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            };
                                        else
                                            return {
                                                backgroundImage: `url(${Checked})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            };
                                    }
                                },
                            ]}
                            data={cmdArray}
                            title="Commandes "
                            options={{
                                actionsColumnIndex: -1,
                                pageSize: 10
                            }}
                            actions={[
                                {
                                    icon: Edit,
                                    tooltip: 'Modifier',
                                    onClick: (event, rowData) => {
                                        this.setState({
                                            fab: rowData
                                        });
                                        this.props.dispatch(showFabDialog(true));
                                    },
                                },
                                {
                                    icon: Supprimer,
                                    tooltip: 'Supprimer',
                                    onClick: (event, rowData) => {
                                        this.setState({
                                            idFab: rowData.id,
                                            nomFab: rowData.nom
                                        });
                                        this.handleClickOpen();
                                    },
                                }
                            ]}
                        />
                    </div>
                </div>
            )
        }
    }

    //else if (this.props.fabricants.length === 0 && this.props.loading) {
    //return <h1 style={{textAlign:'center',paddingTop:250}}>Ajouter des fabricants svp.</h1>;
    //}
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.loading()}
                {this.getData()}
                {this.commandDialog()}
            </div>
        );
    }
}

function

mapStateToProps(state) {
    return {
        loading: state.commandesReducer.loading,
        cmdArray: state.commandesReducer.cmdArray
    };
}

function

matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        getCommandes,
        showFabDialog
    });
    return {...actions, dispatch};
}

export default withRouter(connect

(
    mapStateToProps
    ,
    matchDispatchToProps
)(
    withStyles(styles)

    (
        Commande
    )))
;