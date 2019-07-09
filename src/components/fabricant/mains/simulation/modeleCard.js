import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withRouter} from "react-router-dom";


const styles = {
    card: {
        maxWidth: 250,
        textAlign:'center',
    },
    media: {
        height: 120,
        width:180,
        marginLeft:'15%',

    },
    actions:{
        textAlign:'center',
        display:'inline-block',
    },
    brand:{
        textAlign:'center',
        display:'inline-block',
        height:120,
        width:120,
    },
    title:{
        textAlign:'center',
    }
};

class ModeleCard extends Component {
    gotoVersion = () => {
        if (this.props.location.pathname.includes('versions')){
            this.props.history.push(this.props.location.pathname+ '/' + this.props.id)
        } else {
            this.props.history.push('/fabricant/simulation/versions/'+this.props.id)
        }
    };
    render() {
        return (
            <div>
                <Card style={styles.card} nom={this.props.nom}  >
                    <CardActionArea onClick={this.gotoVersion}>
                        <CardMedia
                            style={styles.media}
                            image={this.props.url}
                            title="Modele"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.nom}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

export default withRouter((withStyles(styles)(ModeleCard)));