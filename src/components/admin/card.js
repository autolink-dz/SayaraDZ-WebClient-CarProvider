import React from 'react';
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
        height: 80,
        width:80,
        marginLeft:'32%',

    },
};

function MediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://www.autobip.com/storage/photos/car_brands/65.png"
                    title="Brand"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.nom}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" style={{width:'100%'}}>
                    Modifier&emsp;&emsp;<EditIcon style={{margin:0,paddingBottom:8}} />
                </Button>
            </CardActions>

        </Card>
    );
}


export default withStyles(styles)(MediaCard);