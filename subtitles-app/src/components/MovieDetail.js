import React, { useState, useEffect } from 'react';
import { Typography, Fab, withStyles, Paper } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import apiKey from '../apiKey';
import Axios from 'axios';
import MoviePropTable from './movies/MoviePropTable';
import { Link } from 'react-router-dom';

const MovieDetail = ({ match, classes }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiKey}&language=en-US`)
      .then(response => {
        setMovie(response.data);
        setIsLoading(false);
      });
  }, [match.params.id]);

  return isLoading || (
    <Paper className={classes.wrapper}>
      <img className={classes.image} src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="Poster" />
      <div className={classes.main}>
        <Typography variant="h3" gutterBottom>{movie.title}</Typography>
        <MoviePropTable movie={movie} />
        <Paper className={classes.description}>
          <Typography variant="h5" gutterBottom>Description</Typography>
          <Typography>{movie.overview}</Typography>
        </Paper>
        {movie.homepage && (
          <Fab className={classes.fab} variant="extended" aria-label="To Homepage" href={movie.homepage} target="_blank">
            Homepage
            <LaunchIcon className={classes.fabIcon} />
          </Fab>
        )}
        <div>
          <Fab variant="extended" className={classes.fab} aria-label="Subtitles" component={Link} to={`/subtitles/${movie.imdb_id}`}>
            Subtitles
          </Fab>
        </div>
      </div>
    </Paper>
  );
};

const styles = theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr'
  },
  image: {
    width: '100%',
    borderRadius: '4px 0 0 4px'
  },
  main: {
    padding: '20px'
  },
  description: {
    padding: 20,
    margin: '20px 0'
  },
  fabIcon: {
    marginLeft: theme.spacing.unit
  },
  fab: {
    marginTop: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(MovieDetail);