const User = require( '../../models/user.js' );

const errorMessage = 'There was an unexpected error. Please try again or contact administrator.';

const getUserInfoByEmail = ( email ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        'local.email': email
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
            data:{
              user: user,
            },
            message: 'OK',
          });
        }
      });
  });
}

module.exports = getUserInfoByEmail;