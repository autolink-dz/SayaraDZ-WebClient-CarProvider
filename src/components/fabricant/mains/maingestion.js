import React, {Component} from 'react';
import './../../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PostData from './testjson'
import SimpleModal from './modal'
import gestionReducer  from './../../../reducers/gestionReducer'
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

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
      },
      card: {
        width:'100%',
      //  maxWidth: 345,
      },
      media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
      },
      button: {
        margin: theme.spacing.unit,
      },
});

class MainGestion extends Component {
 /* Login = () => {
    alert('rrrrr')
    this.setState({n:1})
    //console.log(this.state.n)
    console.log(this.props.marques)
    
    let url = "https://us-central1-sayaradz-75240.cloudfunctions.net/sayaraDzApi/api/v1/marques?next=0&fbclid=IwAR0Vn2F_tAbL-kIIl0sT8OD8l-FqoTes1QaWkcCEGhr6fDow04EcaCIA_i0"
               const requestType = new Request(url, {
                    method: 'GET',
                });

                fetch(requestType)
                    .then(responseType => {
                    if (responseType.status < 200 || responseType.status >= 300) {
                        throw new Error(responseType.statusText);
                    }
                   
                    return responseType.json();
                    })
                    .then((responseType) => {
                     //  console.log(responseType.data) 
                       this.props.dispatch({type : 'SELECT_MARQUES', payload: responseType.data})
                       console.log(this.props.marques)
                  })
                  
  }*/
    render() {
        const { classes } = this.props;
        const datas = Array.from(this.props.marques)
        return (
            <Grid item xs={10}>
                
            <div className={classes.root}>

                <SimpleModal />
            <Grid container spacing={24}>
              
              
              {
                      datas.map(function(item, key){ 
                      return(
                          <Grid item xs={12} sm={3}>
                                <Card className={classes.card}>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      alt="Contemplative Reptile"
                                      className={classes.media}
                                      height="140"
                                      image="/dev.jpg"
                                      title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                      {item.nom}
                                      </Typography>
                                      <Typography component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                  <CardActions>
                                    <Button size="small" variant="contained" color="secondary" className={classes.button}>
                                      Modifier
                                    </Button>
                                    <IconButton aria-label="Delete" className={classes.margin}>
                                      <DeleteIcon fontSize="large" />
                                    </IconButton>
                                  </CardActions>
                                </Card>
                          </Grid>
                      )
                    })
              }
            </Grid>
          </div>
          </Grid>

        );
    }
}

MainGestion.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      marques : state.gestionReducer.marques
    };
  }

  function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        gestionReducer
    });
    return { ...actions, dispatch };
  }
  export default connect(
    mapStateToProps,matchDispatchToProps
  )(withStyles(styles)(MainGestion));