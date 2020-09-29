// import libraries
const mongoose = require('mongoose');
const Portfolio = mongoose.model('portfolios');
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

// READ

// UPDATE

// DELETE


// export controllers
module.exports = {
    uploadImage, 
    //images, 
}