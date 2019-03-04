import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getMarquesList} from "../../actions/getMarquesList";
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaCard from './../../components/admin/card'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {Waypoint} from "react-waypoint";

class MainAdmin extends Component {
    constructor(props)
    {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getMarquesList('0'));
    };

    _renderItems(){
        return (
            <GridList style={{marginLeft:'5%',marginTop:'5%'}} cellHeight={350} cols={5}>
                {this.props.loading && this.props.fabricants.map( (fab,index) =>
                <GridListTile key={index}>
                    <MediaCard nom={fab.nom} url={fab.url} key={fab.id} />
                </GridListTile>
            )}
            </GridList>

        );
    }
    fetchData(){
        this.props.dispatch(getMarquesList(this.props.next));
    };
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
            <div >
                <CircularProgress style={this.props.loading ? {display:'none'}  : stProgresse} />
                {this._renderItems()}
                {this._renderWaypoint()}
                <CircularProgress style={this.props.next==null||this.props.next===0 ? {display:'none'}  : {marginLeft:'48%'} } />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fabricants : state.getFabricantListReducer.fabricants,
        loading : state.getFabricantListReducer.loading,
        error : state.getFabricantListReducer.error,
        next : state.getFabricantListReducer.next,
    };
}

function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        getMarquesList
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(MainAdmin);
