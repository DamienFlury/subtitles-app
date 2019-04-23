import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Paper,
  LinearProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const Cards = ({ subtitles, match }) => {
  const [index, setIndex] = useState(0);
  const [showFrontside, setShowFrontside] = useState(true);

  return (
    <Grid container justify="center" spacing={16}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardActionArea
            onClick={() => setShowFrontside(!showFrontside)}
            style={{ padding: 50 }}
          >
            <CardContent>
              <Typography variant="h3">
                {showFrontside
                  ? subtitles[index].primary
                  : subtitles[index].secondary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Grid container justify="space-between" style={{ marginTop: 20 }}>
          <Button
            disabled={index <= 0}
            onClick={() => {
              setIndex(index - 1);
              setShowFrontside(true);
            }}
          >
            Back
          </Button>
          <Button
            disabled={index >= subtitles.length - 1}
            onClick={() => {
              setIndex(index + 1);
              setShowFrontside(true);
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: 20 }}>
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            {`${index
            + 1}/${subtitles.length}`}

          </Typography>
          <LinearProgress
            variant="determinate"
            value={((index + 1) / subtitles.length) * 100}
            style={{ marginBottom: 20 }}
          />
          <Button
            component={Link}
            to={`/subtitles/${match.params.imdbId}`}
            variant="contained"
            color="primary"
            fullWidth
          >
            Done
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cards;