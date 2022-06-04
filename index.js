const express = require('express'),
bodyParser = require('body-parser'),
uuid=require('uuid');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

let users = [
  {
    "id":1,
    "name" : "Aravind",
    "favMovies" : [ ]
  },
  {
    "id":2,
    "name" : "Kalyan",
    "favMovies" : [ 'Hello', 'Polo']
  },
  {
    "id":3,
    "name" : "Prashant",
    "favMovies" : [ 'Hello', 'Polo']
  },
  {
    "id":4,
    "name" : "Srinika",
    "favMovies" : [ 'Hello', 'Polo']
  },
  {
    "id":5,
    "name" : "Vaidehi",
    "favMovies" : [ 'Hello', 'Polo']
  }
]

let movies = [
  {
    'Description':'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    'Genre':{
      'Name':'Drama',
      'Description':'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
    },
    'Director':{
      'Name':'Frank Darabont',
      'Bio':'Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France',
      'Birth':'1959'
    },
    'Title': 'The Shawshank Redemption',
    'ImageURL':'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i',

  },
  {
    'Description':'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
    'Genre':{
      'Name':'Crime',
      'Description':'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.'
    },
    'Director':{
      'Name':'Francis Ford Coppola',
      'Bio':'Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family.',
      'Birth':'1939'
    },
    'Title': 'The Godfather',
    'ImageURL':'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',

  },
  {
    'Description':'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    'Genre':{
      'Name':'Action',
      'Description':'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
    },
    'Director':{
      'Name':'Christopher Nolan',
      'Bio':'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. ',
      'Birth':'1970'
    },
    'Title': 'The Dark Knight',
    'ImageURL':'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i',

  },
  {
    'Description':'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    'Genre':{
      'Name':'Action',
      'Description':'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.'
    },
    'Director':{
      'Name':'Lana Wachowski',
      'Bio':'Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012).',
      'Birth':'1965'
    },
    'Title': 'The Matrix',
    'ImageURL':'https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=tt_ov_i',

  },
  {
    'Description':'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
    'Genre':{
      'Name':'Drama',
      'Description':'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.'
    },
    'Director':{
      'Name':'Sidney Lumet',
      'Bio':'Sidney Lumet was a master of cinema, best known for his technical knowledge and his skill at getting first-rate performances from his actors -- and for shooting most of his films in his beloved New York. ',
      'Birth':'1924'
    },
    'Title': '12 Angry Men',
    'ImageURL':'https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i',

  },
  {
    'Description':'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    'Genre':{
      'Name':'History',
      'Description':'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.'
    },
    'Director':{
      'Name':'Steven Spielberg',
      'Bio':'One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywoods best known director and one of the wealthiest filmmakers in the world.',
      'Birth': 1946
    },
    'Title': 'Schindlers List',
    'ImageURL':'https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i',

  },
  {
    'Description':'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    'Genre':{
      'Name':'Crime',
      'Description':'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    },
    'Director':{
      'Name':'Quentin Tarantino',
      'Bio':'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. ',
      'Birth':'1963'
    },
    'Title': 'Pulp Fiction',
    'ImageURL':'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i',

  },
  {
    'Description':'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    'Genre':{
      'Name':'Drama',
      'Description':'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.'
    },
    'Director':{
      'Name':'Robert Zemeckis',
      'Bio':'A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). ',
      'Birth':'1951'
    },
    'Title': ' Forrest Gump',
    'ImageURL':'https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i',

  },
  {
    'Description':'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    'Genre':{
      'Name':'Drama',
      'Description':'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.'
    },
    'Director':{
      'Name':'David Fincher',
      'Bio':'David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. ',
      'Birth':'1962'
    },
    'Title': ' Fight Club ',
    'ImageURL':'https://www.imdb.com/title/tt0137523/mediaviewer/rm2110056193/?ref_=tt_ov_i',

  },
  {
    'Description':'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    'Genre':{
      'Name':'Action',
      'Description':'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.'
    },
    'Director':{
      'Name':'Christopher Nolan',
      'Bio':'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. ',
      'Birth':'1970'
    },
    'Title': 'Inception',
    'ImageURL':'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i',

  },

]

//Read movies

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
  const title =req.params.title;;
  const movie = movies.find((movie)=> movie.Title === title);
  if(movie){
    res.status(200).json(movie);
  }else{
    res.status(400).send("no such movie found");
  }
});

app.get('/movies/Genre/:GenreName', (req, res) => {
  const GenreName =req.params.GenreName;;
  const genre = movies.find((movie)=> movie.Genre.Name === GenreName).Genre;
  if(genre){
    res.status(200).json(genre);
  }else{
    res.status(400).send("no such genre found");
  }
});

app.get('/movies/Directors/:DirecName', (req, res) => {
  const DirecName =req.params.DirecName;;
  const direcName = movies.find((movie)=> movie.Director.Name === DirecName).Director;
  if(direcName){
    res.status(200).json(direcName);
  }else{
    res.status(400).send("no such genre found");
  }
});

// Read Users

app.get('/users',(req,res)=> {
  res.status(201).json(users);
})

//Create users

app.post('/users',(req,res) =>{
  let newUser = req.body;
  if(newUser){
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  }else{
    res.status(401).send("users need names");
  }
})

//Update users

app.put('/users/:id',(req,res) => {
  let id = req.params.id;
  let updateUser = req.body;
  let user = users.find((user)=> user.id == id);
  if(user){
    user.name = updateUser.name;
    res.status(201).json(user);
  }else{
    res.status(401).send("no such user found");
  }
})

//Post movie into users

app.post('/users/:id/:movieTitle',(req,res) => {
  let id = req.params.id;
  let movieTitle = req.params.movieTitle;
  let user = users.find((user)=> user.id == id);
  if(user){
    user.favMovies.push(movieTitle);
    res.status(201).send(`${movieTitle} has been added to users ${id}`);
  }else{
    res.status(401).send("no suc user found");
  }
})

//Delete movie from user

app.delete('/users/:id/:movieTitle',(req,res)=>{
  let id = req.params.id;
  let movieTitle = req.params.movieTitle;
  let user = users.find((user)=> user.id == id);
  if(user){
    user.favMovies.filter((title)=>{
      title !== movieTitle
    })
    res.status(201).send(`${movieTitle} has been removed from the users ${id}`)
  }
})

//Delete user

app.delete('/users/:id',(req,res)=>{
  let id = req.params.id;
  let user = users.find((user)=> user.id == id);
  if(user){
    users = users.filter((user)=>{
      user.id != id
    })
    //res.json(users);
    res.status(201).send(`user with ${id} has been removed from the users`)
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
