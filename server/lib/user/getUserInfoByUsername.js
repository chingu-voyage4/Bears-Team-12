const User = require( '../../models/user.js' );

const errorMessage = 'There was an unexpected error. Please try again or contact site administrator.';

const getUserInfoByUsername = ( username ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        'local.username': username
      },
      ( error, user ) => {
        
        if ( error ) {
          return reject({
            error:    error,
            message:  errorMessage,
          });
        }
        else {
          resolve({
            user:     user,
            message:  'OK',
          });
        }
        
      });
  });
}

module.exports = getUserInfoByUsername;