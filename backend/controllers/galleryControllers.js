// import libraries
const mongoose = require('mongoose');
const Gallery = mongoose.model('galleries');
const {cloudinary} = require('../utils/cloudinary');

// CREATE
/** uploads the image to cloudinary and a reference of the image is stored in the database */
var uploadImage = async function (req, res) {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
            upload_preset: 'Gallery',
        });
       // console.log("response");
        //console.log(uploadResponse);
        //res.json({ msg: 'Image uploaded' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}
/*
var images = async function (req, res) {
    
    const { resources } = await cloudinary.search
    .expression('folder:dev_setups')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
}
*/

var getImages = function(req, res) {
    Gallery.find({accountId: req.body.accountId}, function(err, doc) {
        if(err || doc == undefined) {
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
// READ

// UPDATE

// DELETE


// export controllers
module.exports = {
    uploadImage, 
    //images, 
    getImages,
    create
}