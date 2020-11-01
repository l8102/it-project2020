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
    
    var pages = 1;

    if (uploadResponse.pages) {
      pages = uploadResponse.pages;
    }
    console.log(uploadResponse);
    console.log(pages);

    const fileInfo = {
        accountId: req.body.accountId,
        fileVersion: uploadResponse.version,
        filePublicId: uploadResponse.public_id, 
        filePages: pages
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
  File.find({accountId: req.body.accountId, filePublicId: {$exists: true}}, function(err, doc) {
      if(err || doc == undefined) {
          console.error("Images not found")
      } else {
        res.send(doc);
      }
  })
}



// UPDATE

// DELETE
const deleteFile = function (req, res) {
    var id = req.body.id;

    File.findByIdAndDelete(id);
    console.log("File Deleted");

}

const deleteAllFiles = function (accountID) {
    File.deleteMany({ "accountId": req.body.accountId }, function (err, file) {
        if (err || file == undefined) {
            console.error(err);
        } else {
            res.send(file);
            console.log("File Deleted");
        }


    });
}


// export controllers
module.exports = {
  create, 
  uploadFile, 
  getFiles,
  deleteFile,
  deleteAllFiles
}