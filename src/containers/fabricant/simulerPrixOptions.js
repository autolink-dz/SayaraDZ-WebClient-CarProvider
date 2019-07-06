import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getOptionsColors} from "../../actions/fabricant/getOptionsColors";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
    root: {
        backgroundColor: '#e5e5e5',
        height: '100%',
        width: '100%',
        margin: 0
    },
    container: {
        margin: '2%',
        padding: '2%',
        borderRadius: 20,
        display: 'Block',
        height: '78vh'
    },
    input: {
        display: 'none',
    },
    submit: {
        justifyContent: 'center',
        marginLeft: '47%',
        marginTop: '2%',
        backgroundColor: theme.palette.submit.main,
        color: '#FFF',
        '&:hover': {
            backgroundColor: '#2b862e',
        },
    }
});

class SimulerPrixVersions extends Component {
    constructor(props) {
        super(props);
        this.setState({
            check:true
        })
    }

    componentDidMount() {
        this.props.dispatch(getOptionsColors(this.props.match.params.version));
    };

    handleChange() {
        console.log("here");
    }
    _renderItems() {
        const {classes} = this.props;
        if (this.props.error) {
            return (
                <div style={{paddingTop: '17%'}}>
                    <h2 align="center">
                        Error, Token expired !
                    </h2>
                </div>
            )
        }
        if (this.props.loading) {
            return (
                <div>
                    <Paper className={classes.container} elevation={2}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container spacing={16}>
                                    <Grid item xs align={"center"}>
                                        <h2>Les options disponibles</h2>
                                        {this.props.options.map((option, index) =>
                                            <div style={{display: 'flex', alignItems: 'center'}} key={index}>
                                                <Checkbox
                                                    checked={true}
                                                    onChange={this.handleChange}
                                                    value="checkedA"
                                                />
                                                <label>{option.nom}</label>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs align={"center"}>
                                        <h2>Les couleurs disponibles</h2>
                                        {this.props.colors.map((color, index) =>
                                            <div style={{display: 'flex', alignItems: 'center'}} key={index}>
                                                <Checkbox
                                                    checked={true}
                                                    value="checkedA"
                                                    style={{color:color.hex}}
                                                />
                                                <label >{color.nom}</label>
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>

            );
        }

    }


    render() {
        const stProgresse = {marginLeft: '45%', marginTop: '15%', height: 100, width: 100};
        return (
            <div className='board'>
                <CircularProgress style={this.props.loading ? {display: 'none'} : stProgresse}/>
                {this._renderItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        options: state.optionsColorsReducer.options,
        colors: state.optionsColorsReducer.colors,
        loading: state.optionsColorsReducer.loading,
        error: state.optionsColorsReducer.error,
    };
}

function matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        getOptionsColors,
    });
    return {...actions, dispatch};
}

export default connect(
    mapStateToProps, matchDispatchToProps
)(withStyles(styles)(SimulerPrixVersions));