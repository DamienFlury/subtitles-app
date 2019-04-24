import React from 'react';
import { withStyles, Typography, Paper } from '@material-ui/core';
import useSnake from './useSnake';

const Snake = ({ classes }) => {
  const { element, score } = useSnake(600, 300);
  return (
    <Paper>
      <canvas ref={element} width="600" height="300" className={classes.canvas} />
      <div className={classes.statusBar}>
        <span className={classes.spacer} />
        <Typography variant="h5">Score:{score}</Typography>
      </div>
    </Paper>
  );
};

const styles = {
  canvas: {
    backgroundColor: 'white',
    borderRadius: 4
  },
  statusBar: {
    display: 'flex',
    padding: '20px'
  },
  spacer: {
    flex: 1
  }
};

export default withStyles(styles)(Snake);