const User = require( '../../models/user.js' );
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const checkThatPasswordIsValid =  require('../auth/checkThatPasswordIsValid.js')

const localLogin = new LocalStrategy({
    usernameField: 'email',          // these two field determine what the 'name' attribute should be on the login pages
    passwordField: 'password',
    passReqToCallback : true
  },
  ( req, email, password, done ) => {
    User.findOne(
    {
      'local.email': email
    },
    ( error, user ) => {
      if( error ) {
        console.log( error );
      }
      if( !user ) {
        return done(null, false, req.flash('loginMessage', 'Incorrect email or password.'))
      };
      checkThatPasswordIsValid( password, user.local.salt, user.local.hash )
      .then( 
        fulfilled => {
          if( fulfilled['status'] === 'SUCCESS') return done( null, user );
          return done(null, false, req.flash('loginMessage', 'Incorrect email or password.'));
        },
        unfulfilled => {
          console.log( 'There was a problem while logging user in : ', unfulfilled );
          return done(null, false, req.flash('loginMessage', 'An error occurred while trying to log you in. Please contact administrator.'));
        })
      .catch( error => console.log( error ) );
    });
});

module.exports = localLogin;