const User = require( '../../models/user.js' );

const getUserInfoByUsername = ( username ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        'local.username': username
      },
      ( error, user ) => {
        
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        }
        else {
          resolve({
            data: {
              user
            },
            message: 'OK',
          });
        }
      });
  });
}

module.exports = getUserInfoByUsername;