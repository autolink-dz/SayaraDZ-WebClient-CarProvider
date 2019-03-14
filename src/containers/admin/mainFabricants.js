import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
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
import {bindActionCreators} from "redux";
import {getFabsList} from "../../actions/getFabsList";
import Block from '../../assets/clear.svg'
import Checked from '../../assets/circle.svg'
import {resetAddFabricant} from "../../actions/resetAddMarque";

class MainFabricants extends Component {
    constructor(props){
        super(props);
        this.state={
            nom:'',
            url:'',
            fabArray:[]
        }
    }
    fetchImage(id){
        let api = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques/"+id;
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
                    nom:responseType.nom,
                    url:responseType.url,
                })
            })
            .catch((e)=>{
                console.log(e);
            });

    }
    componentDidMount() {
        this.fetchImage(this.props.id_marque);
        this.props.dispatch(getFabsList(this.props.id_marque));
    }
    getData(){
        if ( (this.props.fabricants.length !== 0) && (this.state.url !=='') ){
            this.state.fabArray.push(...this.props.fabricants);
            return  (
                <div>
                    <div style={{textAlign:'center'}}>
                        <br/><br/>
                       <img src={this.state.url} alt="" height="120" width="120"/>
                       <h3>
                           {this.state.nom}
                       </h3>
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
                        ResetSearch:Reset
                    }}
                    columns={[
                        { title: 'Nom', field: 'nom',},
                        { title: 'Prénom', field: 'prenom' },
                        { title: 'Téléphone', field: 'num_tel' },
                        { title: 'Email', field: 'email' },
                        { title: 'État', field: 'disabled',
                            cellStyle:(data)=> {
                                if (data)
                                    return {
                                        backgroundImage: `url(${Block})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition:'center'
                                    };
                                else
                                    return {
                                        backgroundImage: `url(${Checked})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition:'center'
                                    };
                            }
                        },
                    ]}
                    data={this.state.fabArray}
                    title="Fabricants "
                    options={{
                        actionsColumnIndex: -1,
                        pageSize:10
                    }}
                    actions={[
                        {
                            icon: Edit,
                            tooltip: 'Modifier',
                            onClick: (event, rowData) => {
                                alert('You clicked user ' + rowData.name)
                            },
                        }
                    ]}
                />
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getData()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fabricants : state.fabAdminListReducer.fabs,
        loading : state.fabAdminListReducer.loading,
    };
}

function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        getFabsList,resetAddFabricant
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(MainFabricants);