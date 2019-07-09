import React, {Component} from 'react';
import './../../../../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import gestionReducer  from './../../../../../reducers/gestionReducer'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux"
import { getFormValues} from 'redux-form'
import MediaCard from './cardModele'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Waypoint} from "react-waypoint";
import CustomizedSnackbars from "./../../../snackBar";
import AddModele from './../../../../../containers/fabricant/addModele'
import {getModelesList} from './../../../../../actions/modeleActions/getModelesList'
import {resetUpdateModele} from "./../../../../../actions/modeleActions/resetUpdateModele";
import {resetDeleteModele} from "./../../../../../actions/modeleActions/resetDeleteModele";
import ShowModele from './showModele'

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
      place:{
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 130,
        marginTop: theme.spacing.unit * 3,
      },
});

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

class Modele extends Component {
  constructor(props)
    {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
          open: false,
          nom:'',
          code:'',
          url:'',
          options:[],
          couleurs:[]
        };
    }

    componentDidMount() {

      this.props.dispatch({type: 'CLEAR_VERSIONS'});
    }
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  test = (code,nom,url,options,couleurs)=>{
    this.setState({ open: true });
    this.setState({ code: code });
    this.setState({ nom: nom });
    this.setState({ url: url });
    this.setState({ options: options });
    this.setState({ couleurs: couleurs });    
  };
  _renderItems(){
    console.log(this.props.modeles)
    return (
      <Grid container spacing={24}>
          {this.props.modeles.map( (modele,index) =>
            <Grid item xs={12} md={3} sm={6}>
             <MediaCard test={this.test} nom={modele.nom} url={modele.url} id={modele.id} code={modele.code} options={modele.options} couleurs={modele.couleurs} />
             </Grid>
      )}
      <ShowModele
       open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose}
       code={this.state.code} nom={this.state.nom} url={this.state.url} options={this.state.options} couleurs={this.state.couleurs} 
       />
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

    render() {
        const { classes } = this.props;
        const datas = this.props.modeles;
        let snack = null;
        if (this.props.update){
            if(!this.props.error){
               // let msg = "Modele " +this.props.nom+" est modifié avec success !\"";
                let msg = "Modele est modifié avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetUpdateModele())
         }
         if (this.props.delete){
            if(!this.props.error){
              //  let msg = "Modele " +this.props.nom+" est supprimé avec success !\"";
                let msg = "Modele est supprimé avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetDeleteModele())
         }
         let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (
          <Grid item xs={12}>
          <div className={classes.root}>
              <AddModele />
              {snack}
            <CircularProgress className={classes.place} style={this.props.loading ? {display:'none'}  : stProgresse} />
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
      options : state.gestionReducer.options,
      loading : state.gestionReducer.loading,
      error : state.gestionReducer.error,
      next : state.gestionReducer.next,
      update : state.gestionReducer.update,
      delete : state.gestionReducer.delete,
      opts: getFormValues('MyForm')(state)
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