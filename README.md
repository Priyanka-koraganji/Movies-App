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
