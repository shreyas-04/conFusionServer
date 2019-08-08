const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    label: {
        type: String,
        default: ''
    },

    price: {
        type: Currency,
        min: 2,
        required: true
    },

    featured: {
        type: Boolean,
        default: false
    },

    description: {
        type: String,
        required: true
    },


    comments: [commentSchema]
}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;