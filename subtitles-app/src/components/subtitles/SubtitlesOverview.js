import React, { useState } from 'react';
import { Typography, Paper, Table, TableRow, TableCell, TableHead, TableBody, withStyles, Button } from '@material-ui/core';
import LearnTypeCardsGrid from './LearnTypeCardsGrid';
import Snake from './Snake/Snake';
import { useSpring, animated } from 'react-spring';

const SubtitlesOverwiew = ({ subtitles, match, classes, status }) => 
{
  const [showGame, setShowGame] = useState(false);
  const props = useSpring({
    width: showGame ? '600px' : '0px',
    height: showGame ? '375px' : '0px',
    marginRight: showGame ? '20px' : '0px',
    from: {
      width: '0px',
      height: '0px',
      marginRight: '0px'
    }
  });
  const props2 = useSpring({
    opacity: status === 'success' ? 1 : 0,
    from: {
      opacity: 0
    }
  });
  return (
  <>
    <Typography variant="h5" gutterBottom>Subtitles</Typography>
    <div className={classes.flex}>
      <animated.div className={classes.snakeWrapper} style={props}>
        <Snake />
      </animated.div>
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
        <Button className={classes.snakeButton} color="secondary" onClick={() => {setShowGame(!showGame);}} variant="contained" fullWidth>{showGame ? 'Stop Snake' : 'Play Snake'}</Button>
      </Paper>
    </div>
    <animated.div style={props2}>
      {status !== 'loading' && 
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
      }
    </animated.div>
  </>
  );
};

const styles = {
  flex: {
    display: 'flex'
  },
  waitText: {
    padding: '20px',
    flex: 1
  },
  snakeButton: {
    marginTop: '20px'
  },
  snakeWrapper: {
    overflow: 'hidden'
  }
};


export default withStyles(styles)(SubtitlesOverwiew);