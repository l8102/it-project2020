/*
Header
 */

// Import libraries
const mongoose = require('mongoose');

// Username, password are hard coded
// TODO change to dotenv
CONNECTION_STRING = 'mongodb+srv://admin:eagle@eagle-solutions.hn0sb.mongodb.net/eagle-solutions?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_STRING || "mongodb://localhost/eagle-solutions", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "eagle-solutions"
});

const db = mongoose.connection;
db.on("error", err => {
  console.error(err);
  process.exit(1);
});

db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" +
    db.port);
});

// import all the models
require('./accountModels.js');

