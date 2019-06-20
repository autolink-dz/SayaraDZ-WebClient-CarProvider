import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 200,
  },
});

class OptionsCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        checked: [],
      };
  };
  
  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  clearChecked = () => {
    this.setState({
      checked: []
    });
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
   
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }   
    this.setState({
      checked: newChecked,
    });
    
    setTimeout(()=>{
      this.props.handleOptionsChecked(this.state.checked)
    },1000);  
  };
  test=()=>{
    const { checked } = this.state;
  }
  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {this.props.options.map((value, index) => (
          <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(value)}>
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`  ${value.nom }`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

OptionsCheck.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OptionsCheck);