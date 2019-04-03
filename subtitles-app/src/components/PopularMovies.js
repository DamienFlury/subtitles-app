import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { withStyles, CircularProgress } from '@material-ui/core';
import MoviesGrid from './movies/MoviesGrid';
import SearchForm from './SearchForm';
import apiKey from '../apiKey';

const PopularMovies = ({ classes }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setPage(1);
    Axios.get(title === '' ? `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1` : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title.replace(/ /g, '+')}`)
      .then(response => {
        setMovies(response.data.results);
        setIsLoading(false);
      });
  }, [title]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        Axios.get(title === '' ? `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page + 1}` : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title.replace(/ /g, '+')}&page=${page + 1}`)
          .then(response => {
            setMovies(movies.concat(response.data.results));
            setIsLoading(false);
          });
        setPage(page + 1);
      }
    };
    return () => {
      window.onscroll = null;
    };
  });


  return (
    <>
      <SearchForm
        onSubmit={text => setTitle(text)} />
      {isLoading ||
        <div className={classes.movies}>
          <MoviesGrid movies={movies} />
        </div>
      }
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    </>
  );
};

const styles = {
  movies: {
    margin: '30px 0'
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
  }
};



export default withStyles(styles)(PopularMovies);