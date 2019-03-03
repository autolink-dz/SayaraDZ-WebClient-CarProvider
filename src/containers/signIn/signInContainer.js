import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signInClick} from "../../actions/signInClick";
import {bindActionCreators} from "redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import User from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    main: {
        width:400,
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        boxShadow: '0px 2px 46px -2px rgba(0,0,0,0.48)'

    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        height:550
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: '#116FBE'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    progress: {
        display: 'none',
    },
    progressShow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: theme.spacing.unit * 19,
    },

});

class SignInContainer extends Component {
    handelSignIn(e){
        e.preventDefault();
        let username = e.target[0].value;
        let password = e.target[1].value;
        this.props.dispatch(signInClick(username,password));
    }
    render() {
        return (
            <div>
                <main className={this.props.classes.main}>
                    <CssBaseline />
                    <Paper className={this.props.classes.paper}>
                        <Avatar className={this.props.classes.avatar}>
                            <User />
                        </Avatar><br/>
                        <Typography component="h1" variant="h5">
                            Se Connecter
                        </Typography><br/>
                        <form onSubmit={(e)=>this.handelSignIn(e)} className={this.props.classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Address Email</InputLabel><br/>
                                <Input id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Mot de Passe</InputLabel><br/>
                                <Input name="password" type="password" id="password" autoComplete="current-password" />
                            </FormControl><br/><br/>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <br/><br/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={this.props.classes.submit}
                                disabled={this.props.loading}
                            >
                                Se Connecter
                            </Button>
                            <br/><br/>
                            <div >
                                <CircularProgress className={this.props.loading ? this.props.classes.progressShow :this.props.classes.progress }/>
                            </div>
                            <br />
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        loading : state.fireSignIn.loading
    };
}
function matchDispatchToProps(dispatch) {
    let actions =  bindActionCreators({
        signInClick
    });
    return { ...actions, dispatch };
}

export default connect(
    mapStateToProps,matchDispatchToProps
)(withStyles(styles)(SignInContainer));