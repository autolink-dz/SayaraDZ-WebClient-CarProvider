import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getMarquesList} from "../../actions/getMarquesList";
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaCard from './../../components/admin/card'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

class MainAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getMarquesList())
    }

    render() {
        let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (
            <div >
                <CircularProgress style={this.props.loading ? {display:'none',marginLeft:'50%',marginTop:'10%',textAlign: 'center'}  : stProgresse} />

                <GridList style={{marginLeft:'5%',marginTop:'5%'}} cellHeight={350} cols={5}>
                    {this.props.loading && this.props.fabricants.map( (fab,index) =>
                        <GridListTile key={index}>
                            <MediaCard nom={fab.nom} url={fab.url} key={fab.id} />
                        </GridListTile>
                        )
                    }
                </GridList>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fabricants : state.getFabricantListReducer.fabricants,
        loading : state.getFabricantListReducer.loading,
        error : state.getFabricantListReducer.error,
    };
}

function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        getFabricantList: getMarquesList
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(MainAdmin);