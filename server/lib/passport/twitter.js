// ------------------------ Twitter Strategy -----------------------------

const TwitterStrategy = require( 'passport-twitter' ).Strategy;
const User = require( '../../models/user.js' );
const generateRandomUsername =  require('./generateRandomUsername.js');
const getUserInfoByEmail = require( '../user/getUserInfoByEmail.js' ); 

const twitterLogin = new TwitterStrategy({
  
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
    includeEmail: true,
    passReqToCallback : true
    
  },
  ( req, token, tokenSecret, profile, done ) => {
    
    const email = profile.emails[0].value;
    
    const uName = profile.displayName || generateRandomUsername();
    
    // if user 'is not' currently logged in search for social media account then log them in
    // if user 'is' currently logged in then link social media account
    
    if ( !req.user) {  
      
      User.findOne(
      { 
        'twitter.id': profile.id
      },
      ( err, user ) => {
        if ( !user ){
          
          let newUser = new User();
          
          newUser.twitter = {
            id:           profile.id,
            displayName:  uName,
            username:     profile.username,
            email:        email,
            token:        token,
          };
          
          newUser.local = {
            username:     uName,
            email:        email
          };
          
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
    else {
      // Link social media to local account 
      
      User.findOne(
        {
        'local.email': req.user.local.email
        },
        ( error, user ) =>{
          
          user.twitter = { 
            id:           profile.id,
            displayName:  uName,
            username:     profile.username,
            email:        email,
            token:        token,
          };
          
          user.save( ( error ) => {
                
            if ( error ) console.log( error );
            
            return done( error, user );
            
          });
        }
      )
    }
  }
);

module.exports = twitterLogin;
