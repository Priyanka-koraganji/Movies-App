const express = require('express'),
  morgan = require('morgan');

const app = express();
app.use(express.static('public'));

app.use(morgan('common'));

let movies = [
  {
    title: 'The Godfather',
    year: 1972
  },
  {
    title: ' The Shawshank Redemption',
    year: 1994
  },
  {
    title: 'Schindlers List',
    year: 1993
  },
  {
    title: 'Raging Bull',
    year: 1980
  },
  {
    title: 'Casablanca',
    year: 1942
  },
  {
    title: ' Citizen Kane',
    year: 1941
  },
  {
    title: 'Gone with the Wind',
    year: 1939
  },
  {
    title: 'The Wizard of Oz ',
    year: 1939
  },
  {
    title: 'One Flew Over the Cuckoos Nest ',
    year: 1975
  },
  {
    title: ' Lawrence of Arabia',
    year: 1962
  },

]

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
