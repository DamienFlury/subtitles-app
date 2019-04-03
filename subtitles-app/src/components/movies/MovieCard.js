import React from 'react';
import { withStyles, Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const MovieCard = ({ movie, classes }) => (
  <Card>
    <CardActionArea component={Link} to={`/movies/${movie.id}`}>
      <CardMedia className={classes.image} image={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <CardContent>
        <Typography className={classes.title} variant="h6" gutterBottom>{movie.title}</Typography>
        <Typography variant="body1">Rating: {movie.vote_average}/10</Typography>
        <Typography variant="body1">Released: {new Date(movie.release_date).toDateString()}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const styles = {
  title: {
    minHeight: '4rem'
  },
  image: {
    height: '400px'
  }
};


export default withStyles(styles)(MovieCard);