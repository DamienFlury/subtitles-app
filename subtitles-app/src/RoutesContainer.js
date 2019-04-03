import React from 'react';
import { withStyles } from '@material-ui/core';

const RoutesContainer = ({ children, classes }) => (
  <div className={classes.main}>
    {children}
  </div>
);

const styles = {
  main: {
    margin: '20px'
  }
};

export default withStyles(styles)(RoutesContainer);