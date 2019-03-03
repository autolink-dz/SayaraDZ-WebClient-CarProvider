import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getFabricantList} from "../../actions/getFabricantList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import MediaCard from './../../components/admin/card'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

class MainAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getFabricantList())
    }

    getGrids(){
       let data = this.props.response.response.data.data;
       let cardArray=[];
       data.map( (elem)=>{
           let card = React.createElement(
               Grid,
               {item:true ,xs:true},
               React.createElement(
                   MediaCard,
                   {nom:elem.nom ,url:elem.url,key:elem.id},
                   null
               )
           );
           cardArray.push(card);
       } );
       return cardArray;
    }

    render() {
        let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        //console.log(this.props.fab);
        return (
            <div >
                <h1 style={{ textAlign: 'center',paddingTop:60}}>Liste des Fabricants</h1>
                <CircularProgress style={this.props.loading ? {display:'none',marginLeft:'50%',marginTop:'10%',textAlign: 'center',paddingTop:20}  : stProgresse} />

                <GridList style={{marginLeft:'5%'}} cellHeight={350} cols={4}>
                    {this.props.loading && this.props.fabricants.map( (fab,index) =>
                        <GridListTile key={index}>
                            <MediaCard nom={fab.nom} url={fab.url} key={fab.id} />
                        </GridListTile>
                    )}
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

        //fab : state.addFabricantReducer
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        getFabricantList
    });
    return { ...actions, dispatch };
}


export default connect(
    mapStateToProps,matchDispatchToProps
)(MainAdmin);