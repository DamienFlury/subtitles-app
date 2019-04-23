import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import SubtitlesOverwiew from './subtitles/SubtitlesOverview';
import { CircularProgress } from '@material-ui/core';
import { translationApiKey } from '../apiKey';

const Subtitles = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/subtitles/' + match.params.imdbId)
      .then(response => {
        Axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translationApiKey}${response.data.map(word => `&text=${word}`).join('')}&lang=en-de`).then(translation => {
          setSubtitles(response.data.map((word, index) => ({ primary: word, secondary: translation.data.text[index] })));
          setIsLoading(false);
        });
      });
  }, [match.params.imdbId]);
  return isLoading ? (<CircularProgress />) : (
    <Switch>
      <Route path="/subtitles/:imdbId" render={params => <SubtitlesOverwiew {...params} subtitles={subtitles} />} />
    </Switch>
  );
};

export default Subtitles;