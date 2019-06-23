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
        checked: this.props.versionOptions
      };
  };
  
  componentDidMount() {
    this.props.onRef(this)
  this.setState({
    checked: this.props.versionOptions
  });
  this.props.handleOptionsChecked(this.props.versionOptions)  
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
    const currentIndex = checked.findIndex(i => i.nom === value.nom && i.code === value.code)
    const newChecked = [...checked];
    console.log(checked.indexOf(checked.findIndex(i => i.nom === value.nom && i.code === value.code)))
 
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
    console.log(checked)
  }
  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        {this.props.modeleOptions.map((value, index) => (
          <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(value)}>
            <Checkbox
            checked={this.state.checked.findIndex(i => i.nom === value.nom && i.code === value.code) !== -1}
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