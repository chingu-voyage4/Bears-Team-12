/*------------------------------------------------------------------------------
------------------------------ Passport index ----------------------------------
------------------------------------------------------------------------------*/
const passport = require( "passport" );
const User = require( '../../models/user.js' );

const twitterLogin = require('./twitter.js');
const googleLogin = require('./google.js');
const facebookLogin = require('./facebook.js');
const localLogin = require('./local');   // for standard user login 

passport.use( twitterLogin );
passport.use( googleLogin );
passport.use( facebookLogin );
passport.use( localLogin );

passport.serializeUser( ( user, done ) => {
  done(null, user);
});

passport.deserializeUser( ( user, done ) => {
  done(null, user);
});

module.exports = passport;