import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import classNames from 'classnames';

const styles =  theme =>  ({

    margin: {
        margin: theme.spacing.unit,
      },
      cssRoot: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[700],
        '&:hover': {
          backgroundColor: red[900],
        },
      },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseYes = () => {
    this.props.handleDelete()
    this.setState({ open: false });
  };


  handleCloseNo = () => {
    this.setState({ open: false });
  };


  btnDelete(){
      if(this.props.btn==0){
        return (
            <IconButton aria-label="Delete" onClick={this.handleClickOpen}>
            <DeleteIcon fontSize="large" />
            </IconButton>
        );
      }else{
        return (
            <Button onClick={this.handleClickOpen}>
                supprimer
            </Button>
        );
      }
    
}

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.btnDelete()}
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Suppression de la version "}{this.props.nom}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Voulez vous supprimer la version {this.props.nom} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseNo} color="primary">
              annuler
            </Button>
            <Button variant="contained" className={classNames(classes.margin, classes.cssRoot)} onClick={this.handleCloseYes} >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialogSlide.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default (withStyles(styles)(AlertDialogSlide));