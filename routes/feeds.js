var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');

router.get('/', function(req, res, next) {
    Feed.find(function(err, feeds) {
        if(err) {
            return next(err);
        }
        res.json(feeds);
    });
});

router.post('/', function(req, res, next) {
    console.log('post method called');
    var feed = new Feed(req.body);
    feed.save(function(err, feed) {
        if(err) {
            return next(err);
        }
        res.json(feed);
    });
});

var auth = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;