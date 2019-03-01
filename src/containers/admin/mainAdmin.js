import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getFabricantList} from "../../actions/getFabricantList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import MediaCard from './../../components/admin/card'

class MainAdmin extends Component {

    componentDidMount() {
        this.props.dispatch(getFabricantList())
    }

    getGrids(){
       let data = this.props.response.response.data.data;
       console.log(data.length);
       let cardArray=[];
       data.map( (elem,index)=>{
           if(index % 4==0){
               let g =React.createElement(
                   Grid,
                   {item:true ,xs:1},
                   null
               );
               cardArray.push(g);
           }
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
    lert(){
        alert("qsd");
    }
    getContainers(grids){
        let arrContainers=[];
        let arrCards=[];
        let container=null;
        grids.map( (grid,index)=>{
            if(index % 5==0 ){
                container=React.createElement(
                    Grid,
                    {container:true},
                    arrCards
                );
                arrContainers.push(container);
                arrCards=[];
            }
            else{
                arrCards.push(grid);
            }

        });
        container=React.createElement(
            Grid,
            {container:true},
            arrCards
        );
        arrContainers.push(container);

        return arrContainers;
    }

    render() {
        let cards=null;
        if(this.props.response.loading){
            console.log(this.getGrids());
            cards = this.getContainers(this.getGrids());
            console.log(cards);
        }
        let stProgresse = {marginLeft:'50%',marginTop:'10%',textAlign: 'center',paddingTop:20};

        return (
            <div style={{paddingLeft:70}}>
                <h1 style={{ textAlign: 'center',paddingTop:60}}>Liste des Fabricants</h1>
                <CircularProgress style={this.props.response.loading ? {display:'none',marginLeft:'50%',marginTop:'10%',textAlign: 'center',paddingTop:20}  : stProgresse} />

                <div>{cards!=null && cards.map((card,index)=>

                    <div> {card}</div>

                )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        response : state.getFabricantListReducer
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