import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit'
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {bindActionCreators} from "redux";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import CustomizedSnackbars from "./../../../snackBar";
import {putVersion} from "./../../../../../actions/versionActions/putVersion";
import {deleteVersion} from "./../../../../../actions/versionActions/deleteVersion";
import {resetUpdateVersion} from "./../../../../../actions/versionActions/resetUpdateVersion";
import {resetDeleteVersion} from "./../../../../../actions/versionActions/resetDeleteVersion";
import FichTech from "./FichTechForm";

import SelectModele from './selectModeleUpdate'
import OptionsCheck from './optionsCheckUpdate'
import CouleursCheck from './couleursCheckUpdate'
//import MyForm from './FieldArraysForm'
import { getFormValues} from 'redux-form'
import AlertDialogSlide from './validateDelete'

const styles =  theme =>  ({

    actions:{
        textAlign:'center',
        display:'inline-block',
    },
    edit:{
        margin: 0,
        paddingBottom: 8
    },
    delete:{
        color:'#ff2b58',
    },
    brand:{
        textAlign:'center',
        display:'inline-block',
        margin:'auto',
        height:120,
        width:120,
        paddingBottom: 40
    },
    title:{
        textAlign:'center',
    },
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
      cardLeft:{
        width : 1500,
    //    marginLeft : -theme.spacing.unit * 50,
      },
      cardRight:{
        width : 1500,
        marginRight : -theme.spacing.unit * 50,
      },
      hh:{
        width : 1500, 
      },
      chip: {
        marginRight: theme.spacing.unit * 20,
      },
      chip2: {
        marginRight: theme.spacing.unit * 15,
      },
});

class SimpleCardVersion extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            open: false,
            snack:null,
            modele:this.props.idModele,
            options:[],
            couleurs:[],
            optionsChecked:[],
            couleursChecked:[],
            initialValuesFichTech: null,
        };
    }
    componentDidMount() {
     // this.props.dispatch(deleteVersion("X3OmvlSgET7FoOrRARYq"));
        this.setState({ nom: this.props.nom });
        this.setState({ url: this.props.url });
        this.setState({ code: this.props.code });

        this.setState({ options: this.props.allModeles.find(x => x.id === this.props.idModele).options });
        this.setState({ couleurs: this.props.allModeles.find(x => x.id === this.props.idModele).couleurs });
        this.setState({ optionsChecked: this.props.versionOptions });
        this.setState({ couleursChecked: this.props.versionCouleurs });

        let tt = {aaa : "aaaaaaaa",bbb:"bbbbbb"} 
        let obj = this.props.fiche_tech
        console.log(obj)
        //find(x => x.id === this.state.modele).options
        var result = Object.keys(obj).map(function(key) {
          return  {attr:key ,  val: obj[key]}; 
        });
        this.setState({ initialValuesFichTech: {'fiche_tech':result }})
        //setTimeout(()=>{console.log(this.state.initialValuesFichTech)},1000);
    };

    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        
          
        return (
            
            <Card className={classes.card}>
            
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  className={classes.media}
                  image={this.props.url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {this.props.nom}
                  </Typography>
                  <Typography component="p">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>



            </Card>
        );
    }
}

SimpleCardVersion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
function mapStateToProps(state) {
    return {
        err : state.versionReducer.error,
        allModeles : state.gestionReducer.allModeles,
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        putVersion,deleteVersion
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(SimpleCardVersion));