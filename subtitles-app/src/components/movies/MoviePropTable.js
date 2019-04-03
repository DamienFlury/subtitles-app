import React from 'react';
import { Table, TableRow, Typography, TableCell, withStyles, TableBody } from '@material-ui/core';

const MoviePropTable = ({ movie, classes }) => (
  <Table>
    <TableBody>
      {[
        { id: 1, title: 'Genres', body: movie.genres.map(genre => genre.name).join(', ') },
        { id: 2, title: 'Rating', body: movie.vote_average },
        { id: 3, title: 'Released', body: movie.release_date },
        { id: 4, title: 'Production', body: movie.production_companies.map(comp => comp.name).join(', ') }
      ].map(property => (
        <TableRow key={property.id}>
          <TableCell className={classes.tableHead}><Typography>{property.title}:</Typography></TableCell>
          <TableCell><Typography>{property.body}</Typography></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const styles = {
  tableHead: {
    padding: '0 20px 0 0',
    textAlign: 'left',
  }
};

export default withStyles(styles)(MoviePropTable);