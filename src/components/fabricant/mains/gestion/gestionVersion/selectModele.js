import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    width:500,
    minWidth: 120,
  },
  select: {
    '&:before': {
        borderColor: '#000000',
    },
    '&:after': {
        borderColor: '#ffffff',
    }
  },
  icon: {
    fill: "#000000",
  },
});

class SelectModele extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modele: '',
      open: false,
    //  modele:this.props.idModele
    };
  }
  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.handleModele(event.target.value)
    
  };

  handle=(m)=>{
    this.props.handleModele(m)
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
      
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Modele</InputLabel>
          <Select
            className={classes.select}
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.modele}
            onChange={this.handleChange}
            inputProps={{
              name: 'modele',
              id: 'demo-controlled-open-select',
              icon: classes.icon,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="1">
              <em>111111111</em>
            </MenuItem>
            <MenuItem value="2">
              <em>22222222222</em>
            </MenuItem>
            <MenuItem value="3">
              <em>33333333</em>
            </MenuItem>
            {this.props.allModeles.map( (modele,index) =>
                               <MenuItem value={modele.id}>{modele.nom}</MenuItem>
                    )}
            
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectModele.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectModele);