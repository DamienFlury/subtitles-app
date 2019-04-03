import React from 'react';
import { withStyles } from '@material-ui/core';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, classes }) => (
  <div className={classes.movieGrid}>
    {movies.map(movie => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

const styles = {
  movieGrid: { 
    display: 'grid',
    gridTemplateColumns: '1fr', 
    gridGap: '30px', 
  },
  '@media (min-width: 640px)': {
    movieGrid: {
      gridTemplateColumns: '1fr 1fr', 
    }
  },
  '@media (min-width: 1240px)': {
    movieGrid: {
      gridTemplateColumns: '1fr 1fr 1fr 1fr', 
    }
  },

};

export default withStyles(styles)(MovieGrid);