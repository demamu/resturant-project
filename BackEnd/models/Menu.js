const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,

    },
    calories: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    reviews: {
        type: []
    },
    ratings: {
        type: []
    }




});

module.exports = mongoose.model('menu', MenuSchema);