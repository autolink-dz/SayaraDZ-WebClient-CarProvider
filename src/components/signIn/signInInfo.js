import React, {Component} from 'react';
import './../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import women from './../../assets/Manager.jpg'
import money from './../../assets/money.jpg'
import sky from './../../assets/sky.jpg'

class InfoSignIn extends Component {
    render() {

        return (
            <div>
                <div id='info'>
                    <div className="container">
                        <Grid container>

                            <Grid item xs={1} ></Grid>
                            <Grid item xs>
                                <div >
                                    <img src={women}  height='200px' width='200px' alt="img" className="cercle" />
                                    <h2>Lorem Raum</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, sdaze actetur adipiscing elit, sed do eiusmodret ki tempor incididunt ut labore et dolore magna aliqua. Mi proin sed libero enim sed.
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs>
                                <div >
                                    <img src={money}  height='200px' width='200px' alt="img" className="cercle" />
                                </div>
                                <h2>Lorem Raum</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, sdaze actetur adipiscing elit, sed do eiusmodret ki tempor incididunt ut labore et dolore magna aliqua. Mi proin sed libero enim sed.
                                </p>
                            </Grid>
                            <Grid item xs>
                                <div >
                                    <img src={sky}  height='200px' width='200px' alt="img" className="cercle" />
                                </div>
                                <h2>Lorem Raum</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, sdaze actetur adipiscing elit, sed do eiusmodret ki tempor incididunt ut labore et dolore magna aliqua. Mi proin sed libero enim sed.
                                </p>
                            </Grid>

                        </Grid>

                    </div>
                </div>

            </div>
        );
    }
}

export default InfoSignIn;