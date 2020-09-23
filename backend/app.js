// libraries
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// connect to the database
require('./models/database.js');

// for json
app.use(bodyParser.json());
// body parsing of urlencoded bodies (for the forms)
app.use(bodyParser.urlencoded({ extended: true}));

// handle connection with mongoDB (password stuff ???)
app.use(cors());

// importing each of the routes
const accountRoutes = require('./routes/accountRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const fileRoutes = require('./routes/fileRoutes');
const linkRoutes = require('./routes/linkRoutes');

// specifying the path for each of the routes
app.use("/api/account", accountRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/link", linkRoutes);

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  // Set up static folder
  app.use(express.static("../frontend/build"))

  // If no API routes are hit, send the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// establish connection
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// start the app
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;