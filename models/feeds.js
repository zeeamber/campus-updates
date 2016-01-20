var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
    status : String,
});

mongoose.model('Feed', FeedSchema);