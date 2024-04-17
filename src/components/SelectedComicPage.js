import React from 'react';
import ComicDetail from './ComicDetail';

const SelectedComicPage = ({ selectedComic }) => {
  return (
    <div>
      <h1>Selected Comic</h1>
      <ComicDetail comic={selectedComic} />
    </div>
  );
};
