const User = require( '../../models/user.js' );

const errorMessage = 'There was an unexpected error. Please try again or contact site administrator.';

const getUserInfoById = ( userId ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        _id: userId
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

module.exports = getUserInfoById;