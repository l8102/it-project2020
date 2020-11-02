// Import libraries
const mongoose = require('mongoose');
require('dotenv').config();

// Username, password are hard coded
var connection = process.env.CONNECTION_STRING;

mongoose.connect(connection || "mongodb://localhost/eagle-solutions", {
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
require('./portfolioModels.js');
require('./aboutModels.js');
require('./galleryModels.js');
require('./fileModels.js');
require('./linkModels.js');


