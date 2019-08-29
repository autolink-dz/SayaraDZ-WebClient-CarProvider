import React, {Component} from 'react';
import './../../../../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import versionReducer  from './../../../../../reducers/versionReducer'
import { allModeles } from "./../../../../../actions/modeleActions/allModeles";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux"
import MediaCard from './cardVersion'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Waypoint} from "react-waypoint";
import CustomizedSnackbars from "./../../../snackBar";
import AddVersion from './../../../../../containers/fabricant/addVersion'
import {getVersionsList} from './../../../../../actions/versionActions/getVersionList'
import {resetUpdateVersion} from "./../../../../../actions/versionActions/resetUpdateVersion";
import {resetDeleteVersion} from "./../../../../../actions/versionActions/resetDeleteVersion";
import ShowVersion from './showVersion'
import {FirebaseContext} from "./../../../../../utils/firebase/indexFireBase";
import { getVersionListOfModele } from "./../../../../../actions/versionActions/getVersionListOfModele";
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 10,
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
      titre:{
        fontFamily:'Arial',
        textAlign:'center',
      //  marginLeft: theme.spacing.unit * 10,
        marginRight: theme.spacing.unit * 10,
      //  marginTop: theme.spacing.unit * 10,
        marginBottom: theme.spacing.unit * 2,
        padding:theme.spacing.unit * 1,
        backgroundColor:'#EEF2F9'
      },
      btnRetour: {
        left:'0%',
        top:'15%',
      },

});

class Versions extends Component {
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
          couleurs:[],
          fiche_tech:[]
        };
    }

    componentDidMount() {
        this.props.dispatch(allModeles());
    }
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    test = (code,nom,url,options,couleurs,fich)=>{

        var result = Object.keys(fich).map(function(key) {
          return  {attr:key ,  val: fich[key]}; 
        });
      this.setState({ open: true });
      this.setState({ code: code });
      this.setState({ nom: nom });
      this.setState({ url: url });
      this.setState({ options: options });
      this.setState({ couleurs: couleurs });    
      this.setState({ fiche_tech: result });    
    };

  _renderItems(){
    return (
      <Grid container spacing={24}>
          {this.props.versions.map( (version,index) =>
            <Grid key={index} item xs={12} md={3} sm={6}>
             <FirebaseContext.Consumer>{
                            firebase => {
                                return <MediaCard firebase={firebase} test={this.test} 
                                nom={version.nom} 
                                url={version.url} 
                                id={version.id} 
                                code={version.code} 
                                options={version.options} 
                                couleurs={version.couleurs} 
                                fiche_tech={version.fiche_tech} 
                                idModele={version.id_modele} /> 
                            }
                        }
              </FirebaseContext.Consumer>
             </Grid>
          )}
          <ShowVersion
       open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose}
       code={this.state.code} nom={this.state.nom} url={this.state.url} 
       options={this.state.options} couleurs={this.state.couleurs} fiche_tech={this.state.fiche_tech}
       />
       </Grid>
    );
}
fetchData(){
  this.props.dispatch(getVersionListOfModele(this.props.next,this.props.match.params.id));
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
        const datas = this.props.versions;
        let noVersion = null
        if(this.props.versions.length == 0 && this.props.loading){
          noVersion = (
            <Grid container spacing={24} style={{
              justifyContent: 'center',
              fontFamily:'Arial',
              fontSize: 35,
              padding:100,
            }}>
              il n'existe aucune version pour ce modele 
            </Grid>
          )
        }else{
          noVersion=""
        }
        let snack = null;
        if (this.props.update){
            if(!this.props.error){
                let msg = "Version " +this.props.nom+" est modifié avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetUpdateVersion())
         }
         if (this.props.delete){
            if(!this.props.error){
                let msg = "la version est supprimé avec success !\"";
                snack = <CustomizedSnackbars type='success' msg={msg} />
            }
            else {
                snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
            }
             this.props.dispatch(resetDeleteVersion())
         }
         let stProgresse = {marginLeft:'45%',marginTop:'15%',height:100,width:100};
        return (

          <Grid item xs={12}>
          <div className={classes.root}>
          
          <Grid container spacing={24}>
            <Grid  item xs={12} md={1} sm={4}>
            <Button
            className={classes.btnRetour}
          //  color="secondary"
            component={Link} to="/fabricant/gestion/modele" 
            style={
              {
                backgroundColor: '#3EB741',
                color: '#FFF',
              }
            }>
              <ThreeSixtyIcon/>
              retour</Button>
            </Grid>
            <Grid  item xs={12} md={11} sm={8}>
              <Paper className={classes.titre}>  
                <h1>{this.props.match.params.nom}</h1>
              </Paper>
            </Grid>
          </Grid>
              <FirebaseContext.Consumer>{
                            firebase => {
                                return <AddVersion firebase={firebase} id={this.props.match.params.id} />
                            }
                        }
              </FirebaseContext.Consumer>
              {snack}
            <CircularProgress style={this.props.loading ? {display:'none'}  : stProgresse} />
            {
              this._renderItems()
            }<br /><br />
            {noVersion}
            {this._renderWaypoint()}
            <CircularProgress style={this.props.next==null||this.props.next===0 ? {display:'none'}  : {marginLeft:'48%'} } />
          
          </div>
          </Grid>
        );
    }
}

Versions.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      versions : state.versionReducer.versions,
      options : state.versionReducer.options,
      loading : state.versionReducer.loading,
      error : state.versionReducer.error,
      next : state.versionReducer.next,
      update : state.versionReducer.update,
      delete : state.versionReducer.delete,
    };
  }

  function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
      getVersionsList,allModeles,getVersionListOfModele
    });
    return { ...actions, dispatch };
  }
  export default connect(
    mapStateToProps,matchDispatchToProps
  )(withStyles(styles)(Versions));