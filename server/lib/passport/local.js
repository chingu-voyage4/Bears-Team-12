const User = require( '../../models/user.js' );
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const checkValidUserPassword =  require('../auth/checkThatPasswordIsValid.js')

const localLogin = new LocalStrategy({
    usernameField: 'username',          // these two field determine what the 'name' attribute should be on the login pages
    passwordField: 'password'
  },
  ( username, password, done ) => {
    User.findOne(
    {
      username:   username
    },
    ( error, user ) => {
      if( error ) {
        console.log( error );
      }
      if( !user ) return done(null, false, { message: 'Incorrect username or password.' });
      checkValidUserPassword( password, user.salt, user.hash )
      .then( 
        fulfilled => {
          if( fulfilled['status'] === 'SUCCESS') return done( null, user );
          return done(null, false, { message: 'Incorrect username or password.' });
        },
        unfulfilled => {
          console.log( 'There was a problem while logging user in : ', unfulfilled )
        })
      .catch( error => console.log( error ) );
    });
});

module.exports = localLogin;