// import libraries
const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolios');
const Gallery = mongoose.model('galleries');
const {cloudinary} = require('../utils/cloudinary');

// CREATE
/** uploads the image to cloudinary and the url of the image is stored in the database */
var uploadImage = async function (req, res) {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
            upload_preset: 'Gallery',
        });
       // console.log("response");
        console.log(uploadResponse);
        const id = 1;

        const galleryInfo = {
            portfolioId: id,
            imageUrl: uploadResponse.url, 
        }     
        
        const data = new Gallery(galleryInfo);
        
        data.save((function(err, doc) {
            if (err || doc == undefined) {
                res.json(err);
            } else {
                res.json(doc);
            }
        }));
        //res.json({ msg: 'Image uploaded' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}

// READ

// UPDATE

// DELETE


// export controllers
module.exports = {
    uploadImage, 
}