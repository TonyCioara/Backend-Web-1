const mongoose = require('mongoose');


    // const Schema = mongoose.Schema;


const ReviewSchema = new mongoose.Schema ({
    createAt: {type: Date},
    updateAt: {type: Date},

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    reviewTitle: {
        type: String
    },
    rating: {
        type: Number
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review
