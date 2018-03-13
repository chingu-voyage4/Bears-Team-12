//------------------ Facebook Strategy ---------------------------------------

const FacebookStrategy = require('passport-facebook').Strategy;
const User = require( '../../models/user.js' );
const generateRandomUsername =  require('./generateRandomUsername.js');
const websiteUrl = require('./websiteurl.js');

const facebookLogin = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://www.tmattlee.com/pinterest-app/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  ( accessToken, refreshToken, profile, done ) => {
    const email = profile.emails[0].value;
    User.findOne(
      { 
        email: email 
      },
      ( err, user ) => {
        if ( !user ){
          const { name } = profile;
          let newUser = new User();
          newUser.userId = profile.id;
          newUser.username = name.givenName || generateRandomUsername();
          newUser.email = email
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