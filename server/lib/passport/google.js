//------------------ Google Strategy ---------------------------------------

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require( '../../models/user.js' );
const generateRandomUsername =  require('./generateRandomUsername.js');

const googleLogin = new GoogleStrategy({
  
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback : true
    
  },
  
  ( req, accessToken, refreshToken, profile, done ) => {
    
    const email = profile.emails[0].value;
    
    const uName = profile.displayName || generateRandomUsername();
    
     // if user 'is not' currently logged in search for social media account then log them in
    // if user 'is' currently logged in then link social media account

    if (!req.user ){
      
      User.findOne(
        { 
          'google.id': profile.id
        },
        ( err, user ) => {
          
          if ( !user ){
            
            let newUser = new User();
            
            newUser.google = {
              id:       profile.id,
              name:     uName,
              email:    email,
              token:    accessToken
            };
            
            newUser.local = {
              username:     uName,
              email:        email
            }
            
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
          
          user.google = {
            id:       profile.id,
            name:     uName,
            email:    email,
            token:    accessToken
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

module.exports = googleLogin;