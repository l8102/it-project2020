// libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// connect to the database
require('./models/database.js');

// for json
app.use(bodyParser.json());
// body parsing of urlencoded bodies (for the forms)
app.use(bodyParser.urlencoded({ extended: true}));

// handle connection with mongoDB (password stuff ???)
app.use(cors());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/build"))
}

// importing each of the routes
const accountRoutes = require('./routes/accountRoutes');

// specifying the path for each of the routes
app.use("/api/account", accountRoutes);

// establish connection
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// start the app
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;