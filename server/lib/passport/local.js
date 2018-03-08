const User = require( '../../models/user.js' );
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const checkValidUserPassword =  require('../auth/checkThatPasswordIsValid.js')

const localLogin = new LocalStrategy(
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
      checkValidUserPassword( user, password )
      .then( 
        fulfilled => {
          if( fulfilled['status'] === 'SUCCESS') return done( null, user );
          return done(null, false, { message: 'Incorrect username or password.' });
        },
        unfulfilled => {
          console.log( unfulfilled )
        })
      .catch( error => console.log( error ) );
    });
});

module.exports = localLogin;