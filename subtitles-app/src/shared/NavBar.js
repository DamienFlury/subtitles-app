import React from 'react';
import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';


const NavBar = ({ onClick, classes }) => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.title} component={Link} to="/">Subtitles App</Typography>
      <span className={classes.spacer} />
      <Button color="inherit" onClick={onClick}>Switch Theme</Button>
    </Toolbar>
  </AppBar>
);

const styles = {
  title: {
    textDecoration: 'none',
  },
  spacer: {
    flex: 1
  }
};

export default withStyles(styles)(NavBar);