import React from 'react';
import { Typography, Paper, Table, TableRow, TableCell, TableHead, TableBody, withStyles } from '@material-ui/core';
import LearnTypeCardsGrid from './LearnTypeCardsGrid';
import Snake from './Snake/Snake';

const SubtitlesOverwiew = ({ subtitles, match, classes, status }) => (
  <>
    <Typography variant="h5" gutterBottom>Subtitles</Typography>
    <div className={classes.flex}>
      <Snake />
      <Paper className={classes.waitText}>
        {status === 'loading' ? (
        <>
        <Typography variant="h6">Loading...</Typography>
        <Typography variant="body1">This might take a few seconds, because we have to process a lot in the background. In the meantime you can enjoy this snake game.</Typography>
        </>
        ) : status === 'success' ? (
        <>
        <Typography variant="h6">Done!</Typography>
        <Typography variant="body1">Your subtitles are ready!</Typography>
        </>
        ) : (
        <>
        <Typography variant="h6">Error :(</Typography>
        <Typography variant="body1">The subtitles for this movie could not be found. Check out another movie.</Typography>
        </>
        )}
      </Paper>
    </div>
    {status === 'success' && (
      <>
    <LearnTypeCardsGrid match={match} />
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Primary</TableCell>
            <TableCell>Secondary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subtitles.map((subtitle, index) =>
            <TableRow key={index}>
              <TableCell>{subtitle.primary}</TableCell>
              <TableCell>{subtitle.secondary}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
    </>
    )}
  </>
);

const styles = {
  flex: {
    display: 'flex'
  },
  waitText: {
    marginLeft: '20px',
    padding: '20px',
    flex: 1
  }
};


export default withStyles(styles)(SubtitlesOverwiew);