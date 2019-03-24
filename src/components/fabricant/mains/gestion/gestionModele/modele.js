import React, {Component} from 'react';
import './../../../../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//import PostData from './testjson'
import SimpleModal from './../../modal'
import gestionReducer  from './../../../../../reducers/gestionReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import image from './../../../../../images/renault-logo.jpg';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import MediaCard from './cardModele'
import MediaCard2 from './cardModele2'

import CircularProgress from '@material-ui/core/CircularProgress';
import {Waypoint} from "react-waypoint";
import CustomizedSnackbars from "./../../../snackBar";


import AddModele from './../../../../../containers/fabricant/addModele'
import {getModelesList} from './../../../../../actions/modeleActions/getModelesList'
import {resetUpdateModele} from "./../../../../../actions/modeleActions/resetUpdateModele";
import {resetDeleteModele} from "./../../../../../actions/modeleActions/resetDeleteModele";


const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
      },
      card: {
        width:'100%',
        maxWidth: 345,
        
      },
      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
      button: {
        margin: theme.spacing.unit,
      },
});

class Modele extends Component {
  constructor(props)
    {
        super(props);
        this.fetchData = this.fetchData.bind(this);
    }
  _renderItems(){
    console.log(this.props.modeles)
    return (
      <Grid container spacing={24}>
          {this.props.modeles.map( (modele,index) =>
            <Grid item xs={12} md={3} sm={6}>
             <MediaCard nom={modele.nom} url={modele.url} id={modele.id} />
             </Grid>
      )}
       </Grid>
    );
}
fetchData(){
  this.props.dispatch(getModelesList(this.props.next));

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
_renderItems2(){
  console.log(this.props.modeles)
  return (
    <Grid container spacing={24}>
        {this.props.modeles.map( (modele,index) =>
          <Grid item xs={12} md={4} sm={6}>
           <MediaCard2 nom={modele.nom} url={modele.url} id={modele.id} />
           {index}
           </Grid>
    )}
     </Grid>
  );
}
    render() {
        const { classes } = this.props;
        const datas = this.props.modeles;
        let snack = null;
        if (this.props.update){
            if(!this.props.error){
                let msg = "Modele " +this.props.nom+" est modifié avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetUpdateModele())
         }
         if (this.props.delete){
            if(!this.props.error){
                let msg = "Modele " +this.props.nom+" est supprimé avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetDeleteModele())
         }
         let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (

          <Grid item xs={10}>
          <div className={classes.root}>
              <AddModele />
              {snack}
            <CircularProgress style={this.props.loading ? {display:'none'}  : stProgresse} />
            {
              this._renderItems()
            }
            {this._renderWaypoint()}
            <CircularProgress style={this.props.next==null||this.props.next===0 ? {display:'none'}  : {marginLeft:'48%'} } />
          </div>
          </Grid>
        );
    }
}

Modele.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      modeles : state.gestionReducer.modeles,
      loading : state.gestionReducer.loading,
      error : state.gestionReducer.error,
      next : state.gestionReducer.next,
      update : state.gestionReducer.update,
        delete : state.gestionReducer.delete,
    };
  }

  function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
      getModelesList
    });
    return { ...actions, dispatch };
  }
  export default connect(
    mapStateToProps,matchDispatchToProps
  )(withStyles(styles)(Modele));