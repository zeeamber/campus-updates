var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    google_id : String,
    google_name : String,
    email_id : String
});

mongoose.model('User', UserSchema);