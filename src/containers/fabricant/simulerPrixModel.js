import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaCard from '../../components/fabricant/mains/simulation/modeleCard'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import './../../styles/simulation.css'
import {getModeleList} from "../../actions/fabricant/getModelesList";
import {withRouter} from "react-router-dom";
import {getPrices} from "../../actions/fabricant/getPrices";


class SimulerPrixModel extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        if ( this.props.modeles.length === 0){
            this.props.dispatch(getModeleList(this.props.next,localStorage.getItem('id_marque')));
        }
        localStorage.setItem('value',"two");
    };

    fetchData(){
        this.props.dispatch(getModeleList(this.props.next,localStorage.getItem('id_marque')));
    };

    render() {
        let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (
            <div className='board' >
                <h1 align="center"> Choisir le Modele </h1>
                <CircularProgress style={this.props.loading ? {display:'none'}  : stProgresse} />
                <div>
                    <GridList style={{marginLeft: '5%', marginTop: '5%'}} cellHeight={430} cols={4}>
                        {this.props.loading && this.props.modeles.map((fab, index) =>
                            <GridListTile key={index}>
                                <MediaCard nom={fab.nom} url={fab.url} id={fab.id}/>
                            </GridListTile>
                        )}
                    </GridList>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        modeles : state.modeleListReducer.modeles,
        loading : state.modeleListReducer.loading,
        error : state.modeleListReducer.error,
        next : state.modeleListReducer.next,
    };
}

function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        getModeleList,
        getPrices
    });
    return { ...actions, dispatch };
}

export default withRouter(connect(
    mapStateToProps,matchDispatchToProps
)(SimulerPrixModel));
