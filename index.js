const express = require('express'),
bodyParser = require('body-parser'),
uuid=require('uuid');

const app = express();

//using mongoose
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://0.0.0.0:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//READ
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

//Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//get all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
     .then((movies) => {
         res.status(201).json(movies);
     })
     .catch((err) => {
         console.error(err);
         res.status(500).send('Error: ' + err);
     });
});
// app.get('/movies', (req, res) => {
//   Movies.find()
//     .then((movies) => {
//       res.status(201).json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

//get a movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
     .then((movie) => {
         res.json(movie);
     })
     .catch((err) => {
         console.error(err);
         res.status(500).send("Error: " + err);
     });
});
// app.get('/movies/:title',(req,res)=>{
//   Movies.findOne({Title:req.params.title})
//   .then((movie)=>{
//     res.json(movie);
//   })
//   .catch((err)=>{
//     res.status(500).send('Error: ' + err);
//   })
// })

//get data about genre
app.get('/movies/genre/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.genreName })
     .then((movie) => {
         res.json(movie.Genre);
     })
     .catch((err) => {
         console.error(err);
         res.status(500).send('Error: ' + err);
     });
});
// app.get('/movies/Genre/:genreName',(req,res)=>{
//   Movies.findOne({"Genre.Name":req.params.genreName})
//   .then((movie)=>{
//     res.json(movie.Genre);
//   }).catch((err) => {
//     console.error(err);
//     res.status(500).send('Error: ' + err);
//   });
// })

//get data about director
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.directorName })
     .then((movie) => {
         res.json(movie.Director);
     })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});
// app.get('/movies/Director/:directorName',(req,res)=>{
//   Movies.findOne({"Director.Name":req.params.directorName})
//   .then((movie)=>{
//     res.json(movie.Director);
//   }).catch((err) => {
//     console.error(err);
//     res.status(500).send('Error: ' + err);
//   });
// })

// Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
     .then((user) => {
         res.json(user);
     })
     .catch((err) => {
         console.error(err);
         res.status(500).send('Error : ' + err);
     });
});
// app.get('/users/:name', (req, res) => {
//   Users.findOne({ name: req.params.name })
//     .then((user) => {
//       res.json(user);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

//CREATE
//create a user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//UPDATE
//update a user by name
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate(
        { Username: req.params.Username },
        {
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday,
            },
        },
        { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        }
    );
});
// app.put('/users/:name', (req, res) => {
//   Users.findOneAndUpdate({ name: req.params.name }, { $set:
//     {
//       name: req.body.name,
//       password: req.body.password,
//       email: req.body.email,
//       birthday: req.body.birthday
//     }
//   })
// .then((user) =>{
//   res.status(201).json(user)
// })
// .catch((error) => {
//   console.error(error);
//   res.status(500).send('Error: ' + error);
// })
// });

//update user by adding favMovie
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        {$push: { FavoriteMovies: req.params.MovieID }},
        {new : true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});
// app.post('/users/:Name/movies/:MovieID', (req, res) => {
//   Users.findOneAndUpdate({ name: req.params.name }, {
//      $push: { favMovies: req.params.MovieID }
//    },
//    { new: true },
//   (err, updatedUser) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     } else {
//       res.json(updatedUser);
//     }
//   });
// });

//DELETE

//delete a movie from users
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
    {$pull : { FavoriteMovies: req.params.MovieID }},
    {new: true },
    (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// app.delete('/users/:name/movies/:MovieID',(req,res)=>{
//   Users.findOneAndUpdate({ name: req.params.name }, {
//           $pull: { favMovies: req.params.MovieID }
//       })
//       .then((user) =>{
//         console.log(user);
//         res.status(201).send(req.params.MovieID + 'from' + req.params.name + ' was deleted.');
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send('Error: ' + error);
//       })
// })

//delete a user by name
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
     .then((user) => {
         if (!user) {
             res.status(400).send(req.params.Username + ' was not found!');
         } else {
             res.status(200).send(req.params.Username + " was deleted!");
         }
     })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
      });
});
// app.delete('/users/:name', (req, res) => {
//   Users.findOneAndRemove({ name: req.params.name })
//     .then((user) => {
//       if (!user) {
//         res.status(400).send(req.params.name + ' was not found');
//       } else {
//         res.status(200).send(req.params.name + ' was deleted.');
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});


////////////////////////////////////////////////////////////////////////
// let users = [
//   {
//     "Username" : "Aravind",
//     "Password":"Arav.123",
//     "Email":"aravind9393@gmail.com",
//     "Birthday":"1995-05-25",
//     "favMovies" : [ 'The Godfather',' Kill Bill: Vol. 1 ']
//   },
//
//   {
//     "Username" : "Kalyan",
//     "Password":"Kalyan!23",
//     "Email":"kalyan.bunny@gmail.com",
//     "Birthday":"1999-08-08",
//     "favMovies" : ['The Dark Knight',' Once Upon a Time... In Hollywood','Pulp Fiction' ]
//   },
//   {
//     "Username" : "Prashant",
//     "Password":"Prash!6143",
//     "Email":"prashant.pilla@gmail.com",
//     "Birthday":"1986-10-16",
//     "favMovies" : [ ' Once Upon a Time... In Hollywood','Pulp Fiction','Schindlers List']
//   },
//   {
//     "Username" : "Srinika",
//     "Password":"Srini.92",
//     "Email":"srinika.pilla@gmail.com",
//     "Birthday":"1992-11-10",
//     "favMovies" : ['The Matrix','Pulp Fiction' ]
//   },
//   {
//     "Username" : "Vaidehi",
//     "Password":"abcd.123",
//     "Email":"Vaidehi.venkata@gmail.com",
//     "Birthday":"1983-07-09",
//     "favMovies" : [' Once Upon a Time... In Hollywood','Cloud Atlas', '12 Angry Men']
//   }
// ]
//
// let movies = [
//   {
//     'Description':'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
//     'Genre':{
//       'Name':'Drama',
//       'Description':'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
//     },
//     'Director':{
//       'Name':'Frank Darabont',
//       'Bio':'Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France',
//       'Birth':'1959'
//     },
//     'Title': 'The Shawshank Redemption',
//     'ImageURL':'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
//     'Genre':{
//       'Name':'Crime',
//       'Description':'Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. '
//     },
//     'Director':{
//       'Name':'Francis Ford Coppola',
//       'Bio':'Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family.',
//       'Birth':'1939'
//     },
//     'Title': 'The Godfather',
//     'ImageURL':'https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
//     'Genre':{
//       'Name':'Action',
//       'Description':'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
//     },
//     'Director':{
//       'Name':'Christopher Nolan',
//       'Bio':'Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. ',
//       'Birth':'1970'
//     },
//     'Title': 'The Dark Knight',
//     'ImageURL':'https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
//     'Genre':{
//       'Name':'Action',
//       'Description':'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
//     },
//     'Director':{
//       'Name':'Lana Wachowski',
//       'Bio':'Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012).',
//       'Birth':'1965'
//     },
//     'Title': 'The Matrix',
//     'ImageURL':'https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.',
//     'Genre':{
//       'Name':'Drama',
//       'Description':'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
//     },
//     'Director':{
//       'Name':'Sidney Lumet',
//       'Bio':'Sidney Lumet was a master of cinema, best known for his technical knowledge and his skill at getting first-rate performances from his actors -- and for shooting most of his films in his beloved New York. ',
//       'Birth':'1924'
//     },
//     'Title': '12 Angry Men',
//     'ImageURL':'https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
//     'Genre':{
//       'Name':'History',
//       'Description':'. A historical film is a fiction film showing past events or set within a historical period.'
//     },
//     'Director':{
//       'Name':'Steven Spielberg',
//       'Bio':'One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywoods best known director and one of the wealthiest filmmakers in the world.',
//       'Birth': 1946
//     },
//     'Title': 'Schindlers List',
//     'ImageURL':'https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
//     'Genre':{
//       'Name':'Crime',
//       'Description':'Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. '
//     },
//     'Director':{
//       'Name':'Quentin Tarantino',
//       'Bio':'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. ',
//       'Birth':'1963'
//     },
//     'Title': 'Pulp Fiction',
//     'ImageURL':'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywoods Golden Age in 1969 Los Angeles.',
//     'Genre':{
//       'Name':'Comedy',
//       'Description':'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement.'
//     },
//     'Director':{
//       'Name':'Quentin Tarantino',
//       'Bio':'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. ',
//       'Birth':'1963'
//     },
//     'Title': ' Once Upon a Time... In Hollywood',
//     'ImageURL':'https://www.imdb.com/title/tt7131622/mediaviewer/rm1947703297/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.',
//     'Genre':{
//       'Name':'Action',
//       'Description':'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
//     },
//     'Director':{
//       'Name':'Quentin Tarantino',
//       'Bio':'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. ',
//       'Birth':'1963'
//     },
//     'Title': ' Kill Bill: Vol. 1 ',
//     'ImageURL':'https://www.imdb.com/title/tt0266697/mediaviewer/rm2033140224/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle.',
//     'Genre':{
//       'Name':'Action',
//       'Description':'Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
//     },
//     'Director':{
//       'Name':'Quentin Tarantino',
//       'Bio':'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. ',
//       'Birth':'1963'
//     },
//     'Title': 'Kill Bill: Vol. 2',
//     'ImageURL':'https://www.imdb.com/title/tt0378194/mediaviewer/rm2947293952/?ref_=tt_ov_i',
//
//   },
//   {
//     'Description':'An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.',
//     'Genre':{
//       'Name':'Drama',
//       'Description':'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
//     },
//     'Director':{
//       'Name':'Tom Tykwer',
//       'Bio':'Director, writer, producer and composer Tom Tykwer was born in 1965 in Wuppertal, Germany. He showed an interest in film-making from childhood, making super 8 films from the age of 11.',
//       'Birth':'1965'
//     },
//     'Title': 'Cloud Atlas',
//     'ImageURL':'https://www.imdb.com/title/tt1371111/mediaviewer/rm910339584/?ref_=tt_ov_i',
//
//   }
// ]
//
// //Read movies
//
// app.get('/', (req, res) => {
//   res.send('Welcome to my app!');
// });
//
// app.get('/movies', (req, res) => {
//   res.status(200).json(movies);
// });
//
// app.get('/movies/:title', (req, res) => {
//   const title =req.params.title;;
//   const movie = movies.find((movie)=> movie.Title === title);
//   if(movie){
//     res.status(200).json(movie);
//   }else{
//     res.status(400).send("no such movie found");
//   }
// });
//
// app.get('/movies/Genre/:GenreName', (req, res) => {
//   const GenreName =req.params.GenreName;;
//   const genre = movies.find((movie)=> movie.Genre.Name === GenreName).Genre;
//   if(genre){
//     res.status(200).json(genre);
//   }else{
//     res.status(400).send("no such genre found");
//   }
// });
//
// app.get('/movies/Directors/:DirecName', (req, res) => {
//   const DirecName =req.params.DirecName;;
//   const direcName = movies.find((movie)=> movie.Director.Name === DirecName).Director;
//   if(direcName){
//     res.status(200).json(direcName);
//   }else{
//     res.status(400).send("no such genre found");
//   }
// });
//
// // Read Users
//
// app.get('/users',(req,res)=> {
//   res.status(201).json(users);
// })
//
// //Create users
//
// app.post('/users',(req,res) =>{
//   let newUser = req.body;
//   if(newUser){
//     newUser.id = uuid.v4();
//     users.push(newUser);
//     res.status(201).json(newUser);
//   }else{
//     res.status(401).send("users need names");
//   }
// })
//
// //Update users
//
// app.put('/users/:id',(req,res) => {
//   let id = req.params.id;
//   let updateUser = req.body;
//   let user = users.find((user)=> user.id == id);
//   if(user){
//     user.name = updateUser.name;
//     res.status(201).json(user);
//   }else{
//     res.status(401).send("no such user found");
//   }
// })
//
// //Post movie into users
//
// app.post('/users/:id/:movieTitle',(req,res) => {
//   let id = req.params.id;
//   let movieTitle = req.params.movieTitle;
//   let user = users.find((user)=> user.id == id);
//   if(user){
//     user.favMovies.push(movieTitle);
//     res.status(201).send(`${movieTitle} has been added to users ${id}`);
//   }else{
//     res.status(401).send("no suc user found");
//   }
// })
//
// //Delete movie from user
//
// app.delete('/users/:id/:movieTitle',(req,res)=>{
//   let id = req.params.id;
//   let movieTitle = req.params.movieTitle;
//   let user = users.find((user)=> user.id == id);
//   if(user){
//     user.favMovies.filter((title)=>{
//       title !== movieTitle
//     })
//     res.status(201).send(`${movieTitle} has been removed from the users ${id}`)
//   }
// })
//
// //Delete user
//
// app.delete('/users/:id',(req,res)=>{
//   let id = req.params.id;
//   let user = users.find((user)=> user.id == id);
//   if(user){
//     users = users.filter((user)=>{
//       user.id != id
//     })
//     //res.json(users);
//     res.status(201).send(`user with ${id} has been removed from the users`)
//   }
// })
