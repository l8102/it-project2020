// import libraries
const mongoose = require('mongoose');
const File = mongoose.model('files');
const {cloudinary} = require('../utils/cloudinary');

// CREATE
const create = function (accountId) {

  let file = {
    accountId: accountId,
  };

  // creates a new portfolio using the account id
  const data = new File(file);

  // saves entry to the database
  data.save();
  console.log("file created")
};

var uploadFile = async function (req,res) {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
        upload_preset: 'FileUpload',
    });

    console.log(uploadResponse);

    const fileInfo = {
        accountId: req.body.accountId,
        fileVersion: uploadResponse.version,
        filePublicId: uploadResponse.public_id, 
        filePages: uploadResponse.pages
    }     
    
    const data = new File(fileInfo);
    
    data.save((function(err, doc) {
      if (err || doc == undefined) {
          res.json(err);
      } else {
          res.json(doc);
      }
    }));

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
}

// READ
var getFiles = function(req, res) {
  File.find({accountId: req.body.accountId}, function(err, doc) {
      if(err || doc == undefined) {
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