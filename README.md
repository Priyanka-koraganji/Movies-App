# movies-app

Description:
I developed this Movie_Api as part of my Full-Stack Web Development Course at CareerFoundry.

What technology usage and why:
This RESTful movie API combines backend (express, nodejs , mongodb) and frontend (react) and allowed me to get hands-on experience with the MERN stack. I chose this specific stack, because I had prior knowledge of JavaScript and using node.js and React would therefore be the best choice to combine backend and frontend.

What does this application do:
This API allows a users to access a database to receive information on movies dealing with the topic of climate change. Also, the user can get background information on the movies such as information about the movies' directors and genre specifications. The user can sign up, update personal information and save/delete favorite movies to/from his personal profile.

How to install and run the project:
... as a developer, who wants to work with the project
Clone or download repository ...
git clone <github repo url>
install mongodb
npm install mongodb
Connect with own MongoDB (local or external) define CONNECTION_URI as environment variable, otherwise it will connect to mongodb://localhost:27017/test
start the server
npm run start
... as a movie enthusiast, who wants to see the movies
In order to use the application you have to register as a user at https://yourmoviescollection.herokuapp.com/users and then https://yourmoviescollection.herokuapp.com/login to get the jwt token.

Technical Requirements (according to project brief):
MongoDB
node.js, usage of package.json
Express
RESTful architecture
usage of at least three middleware modules
database: built with MongoDB
business logic layer: modeled with Mongoose
API return movies in JSON
no code-errors
testing in Postman
security measures: code for user authentication, user authorization, data validation, meet data security regulations (GDPO)
Deployment on GitHub
Deployment on Heroku

Development Process of the Server-Side:
Installation of node.js and express
Documentation
Open this link to see a documentation of the used endpoints:
https://yourmoviescollection.herokuapp.com/

Installation of all dev dependencies and express middleware for development
See the dependencies listed in the package.json

Create and populate non-relational database MongoDB:
use database schema diagram to sketch structure of database, division into two collections ("movies" and "users").
installing mongo shell
use Mongo Shell to create database with CRUD operations
Create the 2 collections "movies" and "users".
Add 10 documents to the "movies" collection (including embedded documents for the keys "genre" and "director").
In the "users" collection - consisting of 4 documents - references are used to store information about the user's favorite movies.
Building models with Mongoose (Business Logic)
Use Mongoose to build the Business Logic Layer linking the database from MongoDB to the server (and finally to the Web Browser).
Process:
Installation of object model driver Mongoose
Installation of dependencies: jsonwebtoken (jwt), bcrypt
Configuring the schemata for the users and the movies collection
Creation of the Models in a separate models.js file
Exporting the models to index.js
Rewriting the CRUD operations to query the mongoose models
Integrating Mongoose with the REST API
Apply local and jwt authentication methods
Test the endpoints in Postman

Data Security:
Authentication in Node.js/Express using Passport
Implement basic HTTP authentication for initial login requests

Implementation of Security Measures for Backend
CORS in Express (set to allow for all origins)

Hosting on MongoDBAtlas (DBaaS) and HEROKU (PaaS):
Steps
register with heroku, install toolbelt
change port
create Heroku app
create mongodb instance on MongoDBAtlas
export MongoDB database with mongodump (each collection as json, without commas between documents, not arrays)
push Git main to Heroku

Endpoints
Get a list of all movies
Endpoint: /movies

HTTP Method: GET

Request body data format: None

Response body data format: JSON Object holding data about all movies

Get data about a single movie by title
Endpoint: /movies/[Title]

Query Parameters: [Title] of movie

HTTP Method: GET

Request body data format: None

Response body data format: JSON object holding data about a single movie, containing title, description, genre, director, imageURL, featured or not.

Response Example:

{   
    "id": "5dbc2d5e1c8922ba13eb0367",
    "Title": "Bohemian Rhapsody",
    "ReleaseYear": "2018",
    "Description": "A chronicle of the rock band Queen, who rose to fame thanks to their revolutionary sound and the theatrics of their      front man, the iconic Freddie Mercury, culminating in their reunion for the historic set they played at Live Aid in July 1985.",
    "Genre": {    
        "Name": "Musical Drama",        
        "Description": "This movie type features a dramatic plot with a strong musical presence. Often concerning people connected to the entertainment business in some form, the soundtrack is often used to comment or illustrate on the mood of the characters."        
    },
    "Director": {
        "Name": "Brian Singer",
        "Bio": "Hailed as one of the film industry's most exciting and provocative new talents after the huge success of The Usual Suspects (1995), director Bryan Singer has built his reputation on making films that are essentially lengthy, verbally dexterous flirtations with the darker side of human nature.",
        "Birth": "1965",
        "Death": null
    },
    "Actors": [],    
    "ImagePath": "https://www.allmovie.com/movie/bohemian-rhapsody-v670695",
    "Featured": true
}
Get data about a genre by name
Endpoint: /movies/genres/[Name]

Query Parameters: [Name] of genre

HTTP Method: GET

Request body data format: None

Response body data format: A JSON object holding data about a movie genre containing name and description.

Response Example:

{
    "Name": "Musical Drama",
    "Description": "This movie type features a dramatic plot with a strong musical presence. Often concerning people connected to the entertainment business in some form, the soundtrack is often used to comment or illustrate on the mood of the characters."
}
Get data about a director by name
Endpoint: /movies/directors/[Name]

Query Parameters: [Name] of director

HTTP Method: GET

Request body data format: None

Response body data format: JSON object holding data about a director, containing name, bio, date of birth and death if existing.

Response Example:

{
    "Name": "Sofia Coppola",
    "Bio": "The daughter of filmmakers Eleanor and Francis Ford Coppola, she made her film debut as an infant in her father`s acclaimed crime drama film, The Godfather (1972). Coppola later appeared in a supporting role in Peggy Sue Got Married (1986) and portrayed Mary Corleone, the daughter of Michael Corleone, in The Godfather Part III (1990). Her performance in the latter was severely criticised, and she turned her attention to filmmaking.",
    "Birth": "1971",
    "Death": null
}
Get a list of all users
Endpoint: /users

HTTP Method: GET

Request body data format: None

Response body data format: JSON object holding data about all users.

Get a user by username
Endpoint: /users/[Username]

Query Parameters: [Username] of user

HTTP Method: GET

Request body data format: None

Response body data format: JSON object holding data about a single user.

Response Example:

{
    "Favorites": [],
    "_id": "5dcbfa7031b7860017f6ea43",
    "Username": "Sammy123",
    "Password": "$2b$10$Pewtk7wMnqGaKgiifUrBJ.IU/yUIIYZZTqpBFSWTluso7Oqp.eeU2",
    "Email": "sammy123@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z",
    "__v": 0
}
Add a new User
Endpoint: /users

HTTP Method: POST

Request body data format: JSON object holding data about a user, structured like:

Request Example:

{     
        "Username": "Loreley",
        "Password": "passit",
        "Email": "lorymail@gmail.com",
        "Birthday": "1984-02-06T00:00:00.000Z"       
}
Response body data format: JSON object holding data about the user that was added, including an ID and a "Favorites" key.

Response Example:

{
    "Favorites": [],
    "_id": "5dcd116a4aeeaa001759c134",
    "Username": "Loreley",
    "Password": "$2b$10$yLdpCBJOFrCgUsxe.b.BHO5XVpu3BaXwEDJKXKdZ3t0hU95Lg.AJ2",
    "Email": "lorymail@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z",
    "__v": 0
}
Update user info by username
Endpoint: /users/[Username]

Query Parameter: [Username] of user

HTTP Method: PUT

Request body data format: JSON object holding data to be updated, structured like:

Request Example:

{
    "Username": "SuperMario123",
    "Password": "getNewPassword",
    "Email": "SuperMario123@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z"    
}
Response body data format: JSON data holding updated user info.

Response Example:

{
    "Favorites": [
        "5dbc29331c8922ba13eb0361",
        "5dbc27dc1c8922ba13eb035f"
    ],
    "_id": "5dca6f0e309c02bd94b20429",
    "Username": "SuperMario123",
    "Password": "getNewPassword",
    "Email": "SuperMario123@gmail.com",
    "Birthday": "1984-02-06T00:00:00.000Z"
}
Add a movie to list of favorites by movie ID
Endpoint: /users/[Username]/Movies/[MovieID]

Query Parameter: [Username] of user and [MovieID]

HTTP Method: POST

Request body data format: None

Response body data format: A text message indicating the movie was added to the list of favorites and the updated list of favorites.

Response Example:

The movie with ID 5dbc2a891c8922ba13eb0363 was successfully added to list of favorites. Favorites of SuperMario123:
5dbc29331c8922ba13eb0361,5dbc27dc1c8922ba13eb035f,5dbc2a891c8922ba13eb0363
Delete a movie from list of favorites by movie ID
Endpoint: /users/[Username]/Movies/[MovieID]

Query Parameter: [Username] of user and [MovieID]

HTTP Method: DELETE

Request body data format: None

Response body data format: A text message indicating whether the movie was successfully removed and the updated list of favorites.

Response Example:

The movie with ID 5dbc2a891c8922ba13eb0363 was successfully deleted from the list of favorites. Favorites of
SuperMario123: 5dbc29331c8922ba13eb0361,5dbc27dc1c8922ba13eb035f
Delete user by username
Endpoint: /users/[Username]

Query Parameter: [Username] of user

HTTP Method: DELETE

Request body data format: None

Response body data format: A text message indicating whether the user account was successfully deleted.

Response Example:

superHero was deleted
