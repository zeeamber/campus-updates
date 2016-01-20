var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if(err) {
            return next(err);
        }
        res.json(user);
    });
});

module.exports = router;
