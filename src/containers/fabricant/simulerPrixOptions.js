import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getOptionsColors} from "../../actions/fabricant/getOptionsColors";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import {getBasePrice} from "../../actions/fabricant/getBasePrice";
import {checkCarAvailable} from "../../actions/fabricant/checkCarAvailable";
import {resetCarCheck} from "../../actions/fabricant/resetCarCheck";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import SnackBar from "../../components/admin/snackBar";

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
    price: {
        justifyContent: 'center',
        padding: 0,
        borderRadius: 20,
        marginTop: '35%',
        backgroundColor: '#c2efc5',
        '&:hover': {
            backgroundColor: '#ffffff',
            color: '#4e534d',
        },
    },
});
let selectedValue = false;
class SimulerPrixVersions extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        setTimeout( ()=>{
            this.props.dispatch(getBasePrice(localStorage.getItem("code_Model"),this.props.codeVersion));
        },3000);
        this.props.dispatch(getOptionsColors(this.props.match.params.version));
        this.setState({
            total: 0,
            prices: [],
            checkedOptions: []
        })
    };

    componentWillUnmount() {
        localStorage.removeItem('prices');
        localStorage.removeItem('code_Model');
    }

    handleChange(option, index) {
        if( index >= this.props.options.length)
        selectedValue = option.nom;
        if (!this.state.checkedOptions[index])
            this.setState({
                total: parseInt(this.state.total) + this.getPrice(option.code),
            });
        else if (this.state.checkedOptions[index]) {
            this.setState({
                total: parseInt(this.state.total) - this.getPrice(option.code),
            })
        }
        let tmp = this.state.checkedOptions;
        let l1 = this.props.options.length;
        let l2 = this.state.checkedOptions.length;
        if( index >= this.props.options.length){
            for (let x = l1; x < l2; x++) {
                tmp[x] = false;
            }
        }
        tmp[index] = !tmp[index];
        this.setState({
            checkedOptions: [...tmp]
        });
    }

    getPrice(code) {
        return parseInt(JSON.parse(localStorage.getItem('prices')).filter(item =>
            item.code === code
        )[0].price);
    }

    checkAvailability() {
        let options = [];
        let colors = [];
        this.state.checkedOptions.map((item, index) => {
                if (item === true) {
                    if (index >= this.props.options.length) { // colors side
                        colors.push(this.props.colors[index - this.props.options.length]);
                    } else { // options side
                        options.push(this.props.options[index]);
                    }
                }
            }
        );
        let optionString = "";
        options.map( (option,index) => {
            if(index < options.length-1)
                optionString+=option.nom+',';
            else
                optionString+=option.nom

        });
        this.props.dispatch(checkCarAvailable(optionString,colors[0].nom,this.props.codeVersion,localStorage.getItem("code_Model")));
    }

    _renderItems() {

        const {classes} = this.props;
        if (this.props.price !== '' && this.state.total === 0) {
            this.setState({
                total: this.props.price
            });
        }

        if (this.props.options.length !== 0 && this.props.colors.length !== 0 && this.state.checkedOptions.length === 0) {
            this.setState({
                checkedOptions: new Array(this.props.options.length + this.props.colors.length).fill(false)
            });
        }

        if (this.props.error) {
            return (
                <div style={{paddingTop: '17%'}}>
                    <h2 align="center">
                        Error, Token expired !
                    </h2>
                </div>
            )
        }

        if (this.props.price !== '' && this.props.loading && JSON.parse(localStorage.getItem('prices')).length !== 0) {
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
                                                    checked={this.state.checkedOptions[index]}
                                                    onChange={() => this.handleChange(option, index)}
                                                />
                                                <label>{option.nom}</label>
                                            </div>
                                        )}
                                    </Grid>
                                    <div className={classes.price} style={(this.props.price ==='') ? {display: 'none'} : {display: 'block'}}>
                                        <Grid item xs align={"center"}>
                                            <ListItem>
                                                <ListItemText>
                                                    <label>
                                                        Prix De Base : {this.props.price + '.00 DZ'}
                                                    </label>
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem
                                                style={(this.props.price === this.state.total) ? {display: 'none'} : {display: 'block'}}
                                            >
                                                <ListItemText
                                                    disableTypography
                                                    style={{fontWeight: 'bold'}}>
                                                    <label>
                                                        Nouveaux prix : {this.state.total + '.00 DZ'}
                                                    </label>
                                                </ListItemText>
                                            </ListItem>

                                            <ListItem
                                                style={(this.props.price === this.state.total) ? {display: 'none'} : {display: 'block'}}>
                                                <Button onClick={() => this.checkAvailability()}
                                                        style={{marginLeft: '30%'}} variant="contained"
                                                        color="primary">Vérifier</Button>
                                            </ListItem>


                                        </Grid>
                                    </div>
                                    <Grid item xs align={"center"}>
                                        <h2>Les couleurs disponibles</h2>
                                        {this.props.colors.map((color, index) =>
                                            <div style={{display: 'flex', alignItems: 'center'}} key={index}>
                                                <Radio
                                                    onChange={() => this.handleChange(color, index + this.props.options.length)}
                                                    checked={selectedValue === color.nom}
                                                    value={color.nom}
                                                    name="radio-button-demo"
                                                    inputProps={{ 'aria-label': color.nom }}
                                                    style={{color: color.hex}}
                                                />
                                                <label>{color.nom}</label>
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
        let snack = null;
        if (this.props.errorCar || this.props.available) {
            if (this.props.available) {
                let msg = "La voiture est disponible !";
                snack = <SnackBar type='success' msg={msg}/>
            } else {
                snack = <SnackBar type='error' msg="La voiture n'est pas disponible"/>
            }
            this.props.dispatch(resetCarCheck());
        }
        return (
            <div className='board'>
                {snack}
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
        codeVersion: state.optionsColorsReducer.codeVersion,
        loading: state.basePriceReducer.loading,
        error: state.optionsColorsReducer.error,
        price: state.basePriceReducer.price,
        available: state.checkCarReducer.available,
        errorCar: state.checkCarReducer.error,
    };
}

function matchDispatchToProps(dispatch) {
    let actions = bindActionCreators({
        getOptionsColors,
        getBasePrice,
        checkCarAvailable,
        resetCarCheck
    });
    return {...actions, dispatch};
}

export default connect(
    mapStateToProps, matchDispatchToProps
)(withStyles(styles)(SimulerPrixVersions));