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
    let icon_op =<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
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
                {icon_op}
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