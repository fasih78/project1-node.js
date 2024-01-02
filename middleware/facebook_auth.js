const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');
require('dotenv').config()





passport.use(new FacebookStrategy({
    clientID:config.facebookAuth.FACEBOOK_APP_ID,
    clientSecret:config.facebookAuth.FACEBOOK_SCEREAT_KEY,
    callbackURL: config.facebookAuth.callbackURL,
    // graphAPIVersion: 'v12.0'
  }, (accessToken, refreshToken, profile, done) => {
  
    return done(null, profile);
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

