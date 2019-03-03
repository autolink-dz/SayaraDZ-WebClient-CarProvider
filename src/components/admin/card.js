import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit'
const styles = {
    card: {
        maxWidth: 200,
        textAlign:'center',
        marginTop:50,
        marginBottom:50,
    },
    media: {
        height: 120,
        width:120,
        marginLeft:'22%',

    },
};

class MediaCard extends Component {

    hello(x){
        console.log(this.props.nom);
    }
    render() {

        return (
            <Card style={styles.card} nom={this.props.nom} onClick={(e)=>this.hello(e)}>
                <CardActionArea>
                    <CardMedia
                        style={styles.media}
                        image={this.props.url}
                        title="Brand"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.nom}
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" style={{width: '100%'}}>
                        Modifier&emsp;&emsp;<EditIcon style={{margin: 0, paddingBottom: 8}}/>
                    </Button>
                </CardActions>

            </Card>
        );
    }
}

export default withStyles(styles)(MediaCard);