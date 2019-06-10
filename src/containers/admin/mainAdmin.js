import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getMarquesList} from "../../actions/admin/getMarquesList";
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaCard from './card'
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
        if ( this.props.fabricants.length === 0)
        this.props.dispatch(getMarquesList('0'));
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
            <GridList style={{marginLeft:'5%',marginTop:'5%'}} cellHeight={350} cols={5}>
                {this.props.loading && this.props.fabricants.map( (fab,index) =>
                <GridListTile key={index}>
                    <MediaCard nom={fab.nom} url={fab.url} id={fab.id} />
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
        fabricants : state.marquesListReducer.fabricants,
        loading : state.marquesListReducer.loading,
        error : state.marquesListReducer.error,
        next : state.marquesListReducer.next,
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
