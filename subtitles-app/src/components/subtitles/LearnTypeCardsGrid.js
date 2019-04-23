import React from 'react';
import LearnTypeCard from './LearnTypeCard';
import { withStyles } from '@material-ui/core';

const LearnTypeCardsGrid = ({ classes, match }) => (
  <div className={classes.grid}>
    <LearnTypeCard title="Flashcards" description="Learn with cards" to={`/subtitles/${match.params.imdbId}/cards`} image="https://picsum.photos/600/300?random=1" />
    <LearnTypeCard title="Writing" description="Type the correct translation" to="#" image="https://picsum.photos/600/300?random=2" />
  </div>
);

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px 0',
  }
};

export default withStyles(styles)(LearnTypeCardsGrid);