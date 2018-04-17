//------------------ Facebook Strategy ---------------------------------------

const FacebookStrategy = require('passport-facebook').Strategy;
const User = require( '../../models/user.js' );
const generateRandomUsername =  require('./generateRandomUsername.js');

const facebookLogin = new FacebookStrategy({
  
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'],
    passReqToCallback : true

  },
  
  (req, accessToken, refreshToken, profile, done ) => {
    
    const email = profile.emails[0].value;
    
    const uName = profile.displayName || generateRandomUsername();
    
    // if user 'is not' currently logged in search for social media account then log them in
    // if user 'is' currently logged in then link social media account

    if (!req.user ){

      User.findOne(
        { 
          'facebook.id': profile.id
        },
        ( err, user ) => {
          if ( !user ){
            
            const { name } = profile;
            
            let newUser = new User();
            
            
            newUser.facebook = {
              id:       profile.id,
              name:     uName,
              email:    email,
              token:    accessToken,
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
          
          user.facebook = {
            id:       profile.id,
            name:     uName,
            email:    email,
            token:    accessToken,
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

module.exports = facebookLogin;