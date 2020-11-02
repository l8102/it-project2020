// import libraries
const mongoose = require('mongoose');
const File = mongoose.model('files');
const {cloudinary} = require('../utils/cloudinary');

// CREATE

// Creates a new file record in the database using the account id
const create = function (accountId) {

  let file = {
    accountId: accountId,
  };

  // creates a new file using the account id
  const data = new File(file);

  // saves entry to the database
  data.save();
  console.log("file created")
};

// uploads the file to cloudinary and the url of the file is stored in the database
var uploadFile = async function (req, res) {
  try {

    //uploads file to cloudinary 
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: 'FileUpload',
    });

    var pages = 1;

    //if file has more than 1 page, assign pages to page number 
    if (uploadResponse.pages) {
      pages = uploadResponse.pages;
    }
    console.log(uploadResponse);
    console.log(pages);

    //creates a new entry with account id and the components of a cloudinary url 
    const fileInfo = {
      accountId: req.body.accountId,
      fileVersion: uploadResponse.version,
      filePublicId: uploadResponse.public_id,
      filePages: pages
    }

    const data = new File(fileInfo);

    //saves the entry in the database
    data.save((function (err, doc) {
      if (err || doc == undefined) {
        res.json(err);
      } else {
        res.json(doc);
      }
    }));

  } catch (err) {
    console.error(err);
    res.status(500).json({err: 'Something went wrong'});
  }
}

// READ

// Gets all the files from the database for a specific account id, and filters for entries with an filePublicId
var getFiles = function (req, res) {
  File.find({accountId: req.body.accountId, filePublicId: {$exists: true}}, function (err, doc) {
    if (err || doc == undefined) {
      console.error("Images not found")
    } else {
      res.send(doc);
    }
  })
}

// UPDATE

// DELETE

// export controllers
module.exports = {
  create,
  uploadFile,
  getFiles
}