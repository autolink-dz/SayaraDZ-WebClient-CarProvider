import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab';
import {bindActionCreators} from "redux";
import CustomizedSnackbars from "./../../components/fabricant/snackBar";
import OptionsCheck from "./../../components/fabricant/mains/gestion/gestionVersion/optionsCheck";
import CouleursCheck from "./../../components/fabricant/mains/gestion/gestionVersion/couleursCheck";

import {addVersion} from "./../../actions/versionActions/addVersion";
import {resetAddVersion} from "./../../actions/versionActions/resetAddVersion";

import SelectModele from './../../components/fabricant/mains/gestion/gestionVersion/selectModele'
import FichTech from "./../../components/fabricant/mains/gestion/gestionVersion/FichTechForm";
import { getFormValues} from 'redux-form'


class AddVersion extends React.Component {
    constructor(props) {
        super(props);
      //  this.superheroElement = React.createRef();
      this.childRef=null;
        this.state = {
            open: false,
            name:'',
            url:'',
            code:'',
            options:[],
            couleurs:[],
            optionsChecked:[],
            couleursChecked:[],
            modele:'e',
        };
      }
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleCloseA = () => {
        this.setState({ open: false });
    };
    handleAdd = ()=>{
        console.log(this.state.optionsChecked)
        console.log(this.state.couleursChecked)
        this.props.dispatch(addVersion(this.state.name,this.state.code,this.state.url,this.state.modele,this.state.optionsChecked,this.state.couleursChecked));
        this.handleCloseA();
    };
    handleName= (e) =>{
        this.setState({ name: e.target.value });
    };
    handleCode= (e) =>{
        this.setState({ code: e.target.value });
        console.log(this.state.code)
    };
    handleUrl= (e) =>{
        this.setState({ url: e.target.value });
    };

    handleModele= (m) =>{

        this.setState({ modele: m });
        this.child.clearChecked()
        this.child2.clearChecked()
        
        setTimeout(()=>{this.handleOptions()},1000);
       /// setTimeout(()=>{this.setState({ optionsChecked: [] });},1000);
       this.setState({ optionsChecked: [] });
       this.setState({ couleursChecked: [] });
       
     //   this.handleOptions()
    };

    handleOptionsChecked= (array) =>{
        this.setState({ optionsChecked: array });
    };

    handleCouleursChecked= (array) =>{
        this.setState({ couleursChecked: array });
    };

    handleOptions= ()=>{
        let ops=null ;
        if( this.props.allModeles.find(x => x.id === this.state.modele)==undefined){
            ops=null
            this.setState({ options: ['option 1 ','option 2'] });
            this.setState({ couleurs: ['couleur 1','couleur 2'] });
            
            console.log(this.props.allModeles.find(x => x.id === this.state.modele))
        }else{
            ops= this.props.allModeles.find(x => x.id === this.state.modele).options
            this.setState({ options: this.props.allModeles.find(x => x.id === this.state.modele).options });
            this.setState({ couleurs: this.props.allModeles.find(x => x.id === this.state.modele).couleurs });
            
            console.log(this.props.allModeles.find(x => x.id === this.state.modele).options)
        }
    }

    
    handleClick = () => {
     //   console.log(this.refs.child.changeName())
        this.child.clearChecked()
        this.child2.clearChecked()
            
        //this.setState({ i: this.state.i +1 });
    //getWrappedInstance().  
    };

    render() {
        let snack = null;
        if (this.props.add){
           if(!this.props.error){
               let msg = "Version " +this.state.name+" est ajouté avec success !\"";
               snack = <CustomizedSnackbars type='success' msg={msg} />
           }
           else {
               snack = <CustomizedSnackbars type='error' msg='Erreur, veuillez resseyer svp !'/>
           }
            this.props.dispatch(resetAddVersion())
        }

        return (
            <div >
                {snack}
                
                <Fab  color="secondary" aria-label="Add" onClick={this.handleClickOpen} position='static' >
                    <AddIcon />
                </Fab>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseA}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Ajouter un Version</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veuillez introduire le nom du Version ainsi que l'url de sa photo
                        </DialogContentText>
                        <SelectModele handleModele={this.handleModele} allModeles={this.props.allModeles} />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            onChange={ this.handleName }
                        />
                        <TextField
                            margin="dense"
                            id="code"
                            label="Code"
                            fullWidth
                            onChange={ this.handleCode }
                        />
                        <TextField
                            margin="dense"
                            id="url"
                            label="URL"
                            fullWidth
                            onChange={ this.handleUrl }
                        />
            
                 {/*       <MyForm />*/}
                        
                             <br />
                            <h3>choisir les options</h3>
     
                            <DialogContent>
                               <OptionsCheck onRef={ref => (this.child = ref)} options={this.state.options} handleOptionsChecked={this.handleOptionsChecked} /> 
                            </DialogContent>
                            <br />
                            <h3>choisir les couleurs</h3>
                            <DialogContent>
                               <CouleursCheck onRef={ref => (this.child2 = ref)} couleurs={this.state.couleurs} handleCouleursChecked={this.handleCouleursChecked} /> 
                            </DialogContent>
                            <FichTech />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseA} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        add : state.versionReducer.add,
        error : state.versionReducer.error,
        versions : state.versionReducer.versions,
        allModeles : state.gestionReducer.allModeles,  
      //  checked: state.OptionsCheck.checked,     
        fichTech: getFormValues('FichTech')(state)
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        addVersion
    });
    return { ...actions, dispatch };
}
export default connect(
    mapStateToProps,matchDispatchToProps
)(AddVersion);