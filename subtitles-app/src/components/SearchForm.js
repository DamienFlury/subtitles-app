import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const SearchForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(text);
      }}>
      <TextField
        label="Title" value={text} onChange={e => setText(e.target.value)} fullWidth />
    </form>
  );
};

export default SearchForm;