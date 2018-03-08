// ------------------------ Twitter Strategy -----------------------------

const TwitterStrategy = require( 'passport-twitter' ).Strategy;
const User = require( '../../models/user.js' );
const websiteUrl = require('./websiteurl.js');

const twitterLogin = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: websiteUrl + '/auth/twitter/callback'
  },
  ( token, tokenSecret, profile, done ) => {
    User.findOne(
      { 
        userId: profile.id 
      },
      ( err, user ) => {
        
        if ( !user ){
          let newUser = new User();
          newUser.userId = profile.id;
          newUser.userDisplayName = profile.username;
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

module.exports = twitterLogin;
