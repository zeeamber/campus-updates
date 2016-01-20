var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var GoogleAuth = require('google-auth-library');

var OAUTH_CLIENT_ID = "346943952450-9gkebnelig963295fq784v6pm8jlg462.apps.googleusercontent.com";
var OAUTH_CLIENT_SECRET = "ZDWdkqhjJsksKzwnjHyzQuok";
var callBackUrl = "http://localhost:3000/auth/google/callback";

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google'), function(req, res) {
     res.json(req.user);
});

router.post('/google',
  passport.authenticate('google-id-token'),
  function (req, res) {
    res.sendStatus(req.user? 200 : 401);
  }
);

router.post('/tokensignin', function(req, res, next) {
    var token = req.body.idToken;
    var auth = new GoogleAuth();
    var oauth2 = auth.OAuth2(OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, callBackUrl);
    oauth2.verifyIdToken(token, "346943952450-lotb6ooarc5nu0f4g33kpvsvrlghgl5q.apps.googleusercontent.com" , function(err, result) {
        if(!err) {
        }
        else {
        }
    });
});

module.exports = router;