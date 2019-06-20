import React, {Component} from 'react';
import SignInContainer from '../../containers/signIn/SignInContainer'
import SignInInfo from './signInInfo'
import './../../styles/signIn.css'
import {withRouter} from "react-router-dom";

class SignInUi extends Component {
    render() {
        return (
            <div>
                <SignInContainer />
                <SignInInfo />
            </div>
        );
    }
}

export default withRouter(SignInUi);