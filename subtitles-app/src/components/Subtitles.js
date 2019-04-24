import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import SubtitlesOverwiew from './subtitles/SubtitlesOverview';
import { translationApiKey } from '../apiKey';
import Cards from './subtitles/Cards';
import { useSpring, animated } from 'react-spring';

const Subtitles = ({ match }) => {
  const [status, setStatus] = useState('loading');
  const [subtitles, setSubtitles] = useState([]);
  const props = useSpring({
    opacity: 1,
    from: {
      opacity: 0
    }
  });

  useEffect(() => {
    Axios.get('http://localhost:5000/subtitles/' + match.params.imdbId)
      .then(response => {
        Axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translationApiKey}${response.data.map(word => `&text=${word}`).join('')}&lang=en-de`).then(translation => {
          setSubtitles(response.data.map((word, index) => ({ primary: word, secondary: translation.data.text[index] })));
          setStatus('success');
        }).catch(() => setStatus('error'));
      }).catch(() => setStatus('error'));
  }, [match.params.imdbId]);
  return (
    <animated.div style={props}>
      <Switch>
        <Route path="/subtitles/:imdbId/cards" render={params => <Cards {...params} subtitles={subtitles} />} />
        <Route path="/subtitles/:imdbId" render={params => <SubtitlesOverwiew {...params} match={match} subtitles={subtitles} status={status} />} />
      </Switch>
    </animated.div>
  );
};



export default Subtitles;