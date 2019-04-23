import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const LearnTypeCard = ({
  classes, title, description, to, image
}) => (
  <Card className={classes.card} style={{ height: '100%' }}>
    <CardActionArea component={Link} to={to}>
      <CardMedia
        className={classes.media}
        image={image}
        title="lol"
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const styles = {
  card: {
    display: 'block',
    width: '100%',
    minWidth: '200px',
    maxWidth: '500px',
    margin: '20px'
  },
  media: {
    height: 140,
  },
};

export default withStyles(styles)(LearnTypeCard);
