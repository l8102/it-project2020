// import libraries
const mongoose = require('mongoose');
const About = mongoose.model('abouts');


// CREATE
const create = function (accountId) {

  let about = {
    accountId: accountId,
    };

  // creates a new portfolio using the account id
  const data = new About(about);

  // saves entry to the database
  data.save();
  console.log("about created")
};

// READ
const readAbout = function (req, res) {

    About.findOne({ "accountId": req.query.accountId }, function (err, about) {

        if (err || about === undefined) {
            console.error("AboutMe not found");
            res.send("false");
            return false;
        } else {
            console.log("AboutMe found");
            res.json(about);
            return true;
        }
    });
}



// UPDATE
const updateByAccountId = function (req, res, next) {

    About.findOne({ "accountId": req.body.accountId }, function (err, about) {

        if (err || about === undefined) {
            console.error("aboutMe not found");
            res.send("false");
            return false;
        } else {
            state = req.body.state;

            about.institution = state.institution;
            about.degree = state.degree;
            about.major = state.major;
            about.description = state.description;
            about.interests = state.interestList;
            about.workExperience = state.experienceList;
            
            about.save();
            console.log("aboutMe updated");
            res.json(about);
            return true;
        }
    });
};


// DELETE
const deleteAbout = function (req, res) {
    var id = req.body.id;

    About.findByIdAndDelete(id);
    console.log("Aboute Me Deleted");

}

const deleteAboutAcc = function (accountID) {
    About.deleteOne({ "accountId": accountID }, function (err, about) {
        if (err || about == undefined) {
            console.error(err);
        } else {
            res.send(about);
            console.log("About Me Deleted");
        }


    });
}

// export controllers
module.exports = {
    create,
    updateByAccountId,
    readAbout,
    deleteAboutAcc,
    deleteAbout
}