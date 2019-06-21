import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Waypoint} from "react-waypoint";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {getVersionsList} from "../../actions/fabricant/getVersionsList";
import MediaCard from '../../components/fabricant/mains/simulation/modeleCard'
import {resetVersion} from "../../actions/fabricant/resetVersion";

class SimulerPrixVersions extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        if ( this.props.versions.length === 0)
            this.props.dispatch(getVersionsList(this.props.next, localStorage.getItem('id_marque'), this.props.match.params.id));
    };

    componentWillUnmount() {
        this.props.dispatch(resetVersion());
    }

    fetchData(){
        getVersionsList(this.props.next, localStorage.getItem('id_marque'), this.props.match.params.id)
    };

    _renderItems(){
        if (this.props.error){
            return (
                <div style={{paddingTop:'17%'}}>
                    <h2 align="center">
                        Error, Token expired !
                    </h2>
                </div>
            )
        }
        return (
            <div>
                <GridList style={{marginLeft:'5%',marginTop:'5%'}} cellHeight={260} cols={3}>
                    {this.props.loading && this.props.versions.map((fab,index) =>
                        <GridListTile key={index}>
                            <MediaCard nom={fab.nom} url={fab.url} id={fab.id}/>
                        </GridListTile>
                    )}
                </GridList>
            </div>

        );
    }

    _renderWaypoint(){
        if (this.props.loading){
            return (
                <Waypoint
                    onEnter={this.fetchData}
                />
            );
        }
    }

    render() {
        let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (
            <div className='board' >
                <h1 align="center"> Choisir La Version </h1>
                <CircularProgress style={this.props.loading ? {display:'none'}  : stProgresse} />
                {this._renderItems()}
                {this._renderWaypoint()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        versions : state.versionListReducer.versions,
        loading : state.versionListReducer.loading,
        error : state.versionListReducer.error,
        next : state.versionListReducer.next,
    };
}

function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        getVersionsList,
        resetVersion
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(SimulerPrixVersions);