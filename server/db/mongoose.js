// Require mongoose and connect to the MongoDB database.
// Mongoose is basically used to model data, an intermediate between mongodb and Node.js
// Speeds up writing queries and data validation. 
// Certainly could use Mongodb without it. 
/*
If we wanted to connect to MongoDB w/o Mongoose, we would need the driver called 'MongoClient'
Example: MongoClient.connect('mongodb://localhost:27017/TodoApp')
*/

const mongoose = require('mongoose');

const db; 

const theURI = process.env.MONGODB_URI

// mongoose.connect('mongodb://localhost:27017/musicoll'); // Where MongoDB is connected

mongodb.MongoClient.connect(theURI, function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
});

mongoose.Promise = require('bluebird');

module.exports = {
    mongoose: mongoose,
    db: db
}