const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    accountId: {
        type: String,
        required: true
    },


    institution: {
        type: String
    },
    degree: {
        type: String
    },
    major: {
        type: String
    },


    description: {
        type: String
    },

    interests: {
        type: [String],
        value: [String],
        default: undefined
    },

    workExperience: {
        type: [{ experience: String, dateFrom: Date, dateTo: Date }],
        value: [{ experience: String, dateFrom: Date, dateTo: Date }],
    },
    
}, {
  collection: 'About',
  timestamps: true,
});

mongoose.model('abouts', aboutSchema);