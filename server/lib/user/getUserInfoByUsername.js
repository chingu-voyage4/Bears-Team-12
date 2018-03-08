const User = require( '../../models/user.js' );

const getUserInfoByUsername = ( username ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        username: username
      },
      ( error, user ) => {
        
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        }
        else {
          resolve({
            user:     user,
            message: 'OK',
          });
        }
      });
  });
}

module.exports = getUserInfoByUsername;