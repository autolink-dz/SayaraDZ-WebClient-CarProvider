import React, {Component} from 'react';
import './../../styles/signInInfo.css'
import Grid from '@material-ui/core/Grid';
import women from './../../assets/Manager.png'
import money from './../../assets/money.jpg'
import sky from './../../assets/sky.png'

class InfoSignIn extends Component {
    render() {

        return (
            <div>
                <div id='info'>
                    <div >
                        <Grid container className="container">
                            <Grid item xs={1}></Grid>
                            <Grid item xs>
                                <div >
                                    <img src={women}  height='200px' width='200px' alt="img" className="cercle" />
                                    <h2>Gestion à distance</h2>
                                    <p>
                                       Créer des liens entre vos collaborateurs, Assurer une certaine cohesion et d'installer
                                        un climat de confiance .
                                    </p>
                                </div>
                            </Grid>
                            <Grid item xs>
                                <div >
                                    <img src={money}  height='200px' width='200px' alt="img" className="cercle" />
                                </div>
                                <h2> Rentabilité  </h2>
                                <p>
                                    Attirer plus de clients, booster la reputqtion de vos produits et faire plus de bénéfices .
                                </p>
                            </Grid>
                            <Grid item xs>
                                <div >
                                    <img src={sky}  height='200px' width='200px' alt="img" className="cercle" />
                                </div>
                                <h2>Visibilité des offres</h2>
                                <p>
                                     Etre visible est la condition necessaire au developpement de votre activité.
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