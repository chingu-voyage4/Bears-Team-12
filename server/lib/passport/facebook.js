//------------------ Facebook Strategy ---------------------------------------

const FacebookStrategy = require('passport-facebook').Strategy;
const User = require( '../../models/user.js' );
const websiteUrl = require('./websiteurl.js');

const facebookLogin = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://www.tmattlee.com/pinterest-app/auth/facebook/callback"
  },
  ( accessToken, refreshToken, profile, done ) => {
    User.findOne(
      { 
        userId: profile.id 
      },
      ( err, user ) => {
        
        if ( !user ){
          let newUser = new User();
          newUser.userId = profile.id;
          newUser.userDisplayName = profile.displayName;
          newUser.posts = [];
          newUser.save( ( error ) => {
            if ( error ) console.log( error );
            return done( err, newUser );
          });
        }
        else{
          return done( err, user );
        }
    });
  }
);

module.exports = facebookLogin;