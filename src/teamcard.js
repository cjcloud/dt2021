import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const shirtImage = require("./images/manUtdShirt.jpg");

const useStyles = makeStyles({
  root: {
    maxWidth: 120,
  },
  media: {
    marginTop: 10,
    height: 60,
    maxWidth: 60,
  },
  // overrides: {

  //   text: size
  // },
});

function Player() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={shirtImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Harry Maguire
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Manchester Utd
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default function PlayerCard() {
  return <Player></Player>;
}
