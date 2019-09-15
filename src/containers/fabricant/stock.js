import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Chip from "@material-ui/core/Chip";
import FaceIcon from '@material-ui/icons/CloudUpload';
import UploadIcon from '@material-ui/icons/CreateNewFolderOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackBar from "../../components/admin/snackBar";

const styles = theme => ({
    root:{
        backgroundColor:'#e5e5e5',
        height:'100%',
        width:'100%',
        paddingTop:60,
        paddingBottom:'1%',
        margin:0
    },
    container: {
        margin: '2%',
        padding: '2%',
        borderRadius: 20,
        display: 'Block',
        height:'78vh'
    },
    input: {
        display: 'none',
    },
    submit: {
        justifyContent: 'center',
        marginLeft: '47%',
        marginTop: '2%',
        backgroundColor: theme.palette.submit.main,
        color:'#FFF',
        '&:hover': {
            backgroundColor: '#2b862e',
        },
    }
});

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorStock: 'default',
            colorTarifs: 'default',
            fileStock: null,
            fileTarifs: null,
            submit: false,
            finish:false
        };
        this.input1 = React.createRef();
        this.input2 = React.createRef();
        localStorage.setItem('value',"two");
    }

     handleStock(e) {
         let file = e.target.files[0];
         if (file) {
             let r = new FileReader();
             r.onload = () => {
                 this.setState({
                     fileStock: file,
                     colorStock: 'secondary'
                 });
             };
             r.readAsText(file);
         }
     }

    handleTarifs(e){
        let file = e.target.files[0];
        if(file){
            let r = new FileReader();
            r.onload= ()=>{
                this.setState({
                    fileTarifs:file,
                    colorTarifs:'secondary'
                });
            };
            r.readAsText(file);
        }
    }
    handleSubmit(){
        this.setState({
            submit:true
        });

        this.props.firebase.storage().ref().child('/csv/stocks/'+localStorage.getItem('id_marque')+'.csv')
            .put(this.state.fileStock).then(()=> {
            this.props.firebase.storage().ref().child('/csv/tarifs/'+localStorage.getItem('id_marque')+'.csv')
                .put(this.state.fileTarifs).then(() => {
                this.setState({
                    finish:true,
                    submit: false,
                });
                setTimeout(()=>{
                    this.setState({
                        colorStock: 'default',
                        colorTarifs: 'default',
                        fileStock: null,
                        fileTarifs: null,
                        submit: false,
                        finish:false
                    });
                    this.input1.current.value='';
                    this.input2.current.value='';
                },3000)
            });
        });
    }

    render() {
        const { classes } = this.props;
        let snackBar=null;
        if(this.state.finish) snackBar = <SnackBar type='success' msg={'Les fichiers sont uploadé avec succès'} />
        return (
            <div className={classes.root}>
                {snackBar}
                <Paper className={classes.container} elevation={2}>
                 <h1 align="center">Uploader des fichiers</h1><br/><br/>
                 <Grid container >
                     <Grid item xs={12}>
                         <Grid container spacing={16} >
                             <Grid item xs align={"center"}>
                                 <Chip
                                     icon={<FaceIcon />}
                                     label="Uploader fichier stock"
                                     clickable={false}
                                     className={classes.chip}
                                     color={this.state.colorStock}
                                     variant="outlined"
                                     style={{
                                         backgroundColor: "#ffffff"
                                     }}
                                 />
                                 <br/><br/>
                                 <p align="justify">
                                     1- Upload de la liste des véhicules actuellement disponibles. Ce fichier est au format CSV et contient les informations telles que numéro de châssis, version et options
                                 </p>
                                 <br/><br/>
                                 <input
                                     accept="text/csv"
                                     className={classes.input}
                                     id="contained-button-fileStock"
                                     type="file"
                                     onChange={(e)=>this.handleStock(e)}
                                     ref={this.input1}
                                 />
                                 <label htmlFor="contained-button-fileStock">
                                     <Button variant="contained" component="span" color={"primary"} >
                                         Upload
                                     </Button>
                                 </label>
                             </Grid>
                             <Grid item xs  align={"center"}>
                                 <Chip
                                     icon={<UploadIcon />}
                                     label="Uploader fichier tarifs"
                                     clickable={false}
                                     className={classes.chip}
                                     color={this.state.colorTarifs}
                                     variant="outlined"
                                 />
                                 <br/><br/>
                                 <p align="justify">
                                     2- Upload d’un fichier CSV contenant une liste de lignes de tarifs. Ces lignes de tarifs seront utilisées pour le calcul des prix des véhicules pour les commandes.                                 </p>
                                 <br/>
                                 <input
                                     accept="text/csv"
                                     className={classes.input}
                                     id="contained-button-file"
                                     type="file"
                                     multiple
                                     onChange={(e)=>this.handleTarifs(e)}
                                     ref={this.input2}
                                 />
                                 <label htmlFor="contained-button-file">
                                     <Button variant="contained" component="span" color={"primary"}>
                                         Upload
                                     </Button>
                                 </label>
                             </Grid>
                         </Grid>
                     </Grid>
                     </Grid>
                 <br/>
                 <LinearProgress variant="query" style={(this.state.submit?{display:'block'}:{display:'none'})} />
                 <Button
                     variant="contained"
                     className={classes.submit}
                     disabled={!(this.state.fileStock != null && this.state.fileTarifs != null) || this.state.submit}
                     onClick={()=>this.handleSubmit() }
                 >
                     ENVOYER
                 </Button>
                 </Paper>

          </div>
    );
  }
}

export default (withStyles(styles)(Stock));