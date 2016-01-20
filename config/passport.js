//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleTokenStrategy = require('passport-google-id-token');

var OAUTH_CLIENT_ID = "346943952450-9gkebnelig963295fq784v6pm8jlg462.apps.googleusercontent.com";
var OAUTH_CLIENT_SECRET = "ZDWdkqhjJsksKzwnjHyzQuok";
var callBackUrl = "http://localhost:3000/auth/google/callback";

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    passport.use(new GoogleTokenStrategy({clientID: OAUTH_CLIENT_ID}, function(parsedToken, googleId, done) {
        User.findOne({ google_id: googleId }, function (err, user) {
            return done(err, user);
        });
    }));

    /*passport.use(new GoogleStrategy({
        clientID : OAUTH_CLIENT_ID,
        clientSecret : OAUTH_CLIENT_SECRET,
        callbackURL : callBackUrl
    },
    function(token, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            User.findOne({ 'google_id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } 
                else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();

                    // set all of the relevant information
                    newUser.google_id    = profile.id;
                    newUser.google_token = token;
                    newUser.google_name  = profile.displayName;
                    newUser.email_id = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }
    ));*/
}
    