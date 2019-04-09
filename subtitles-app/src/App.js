import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PopularMovies from './components/PopularMovies';
import MovieDetail from './components/MovieDetail';
import NavBar from './shared/NavBar';
import RoutesContainer from './RoutesContainer';
import Subtitles from './components/Subtitles';


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const theme = createMuiTheme({
    palette: {
      primary: deepOrange,
      type: isDarkTheme ? 'dark' : 'light',
    },
    typography: {
      useNextVariants: true,
      fontFamily: 'Raleway,sans-serif'
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar onClick={() => setIsDarkTheme(!isDarkTheme)} />
        <RoutesContainer>
          <Switch>
            <Route path="/movies/:id" component={MovieDetail} />
            <Route path="/subtitles/:imdbId" component={Subtitles} />
            <Route path="/" component={PopularMovies} />
          </Switch>
        </RoutesContainer>
      </Router>
    </MuiThemeProvider>
  );
};


export default App;
