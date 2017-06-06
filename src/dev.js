import express from 'express';
import app from './app';

app.use(express.static('public'));

app.listen(3001, function() {
  console.log('Listening on dev server 3001');
});
