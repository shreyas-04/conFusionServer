const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const Schema = mongoose.Schema;

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    },

    firstname: {
        type: String,
        default: ''
    },

    lastname: {
        type: String,
        default: ''
    },

    facebookId: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);