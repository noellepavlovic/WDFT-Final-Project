const User = require('./db/models/Users');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

console.log(process.env.GOOGLE_CLIENT_ID)


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile)
       User.findOrCreate({ username: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
