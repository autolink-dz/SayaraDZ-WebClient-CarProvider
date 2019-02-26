import React, {Component} from 'react';
import SignInContainer from './../../containers/signIn/signInContainer'
import SignInInfo from './signInInfo'
import './../../styles/signIn.css'

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

export default SignInUi;