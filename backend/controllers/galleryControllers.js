// import libraries
const mongoose = require('mongoose');
const Gallery = mongoose.model('galleries');
const {cloudinary} = require('../utils/cloudinary');

// CREATE
// uploads the image to cloudinary and the url of the image is stored in the database
var uploadImage = async function (req, res) {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
      upload_preset: 'Gallery',
    });
    // console.log("response");
    console.log(uploadResponse);
    const id = req.body.accountId;
    console.log(uploadResponse.url);

    const galleryInfo = {
      accountId: id,
      imageUrl: uploadResponse.url,
    }

    const data = new Gallery(galleryInfo);

    data.save((function (err, doc) {
      if (err || doc == undefined) {
        res.json(err);
      } else {
        res.json(doc);
      }
    }));
    //res.json({ msg: 'Image uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({err: 'Something went wrong'});
  }
}

// READ

// Gets the images linked to a specified account id
var getImages = function (req, res) {

  Gallery.find({accountId: req.body.accountId, imageUrl: {$exists: true}}, function (err, doc) {
    if (err || doc == undefined) {
      console.error("Images not found")
    } else {
      res.send(doc);
    }
  })
}
const create = function (accountId) {

  let gallery = {
    accountId: accountId,
  };

  // creates a new portfolio using the account id
  const data = new Gallery(gallery);

  // saves entry to the database
  data.save();
  console.log("gallery created")
};

// UPDATE

// DELETE
const deleteAllImages = function (req, res) {
  Gallery.drop();
}


// export controllers
module.exports = {
  uploadImage,
  //images,
  getImages,
  create,
  deleteAllImages
}