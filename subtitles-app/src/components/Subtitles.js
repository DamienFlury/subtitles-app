import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import Axios from 'axios';

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
  return (
  <>
    <Typography>Subtitles</Typography>
    <Typography>{match.params.title}</Typography>
    <List>
      {subtitles.map((subtitle, index) => 
        <ListItem key={index}>
          <ListItemText primary={subtitle} />
        </ListItem>
      )}
    </List>
  </>
  );
};

export default Subtitles;