import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import SubtitlesOverwiew from './subtitles/SubtitlesOverview';
import { CircularProgress } from '@material-ui/core';

const Subtitles = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/subtitles/' + match.params.imdbId)
      .then(response => {
        setSubtitles(response.data);
        setIsLoading(false);
      });
  }, []);
  return isLoading ? (<CircularProgress />) : (
    <Switch>
      <Route path="/subtitles/:imdbId" render={params => <SubtitlesOverwiew {...params} subtitles={subtitles} />} />
    </Switch>
  );
};

export default Subtitles;