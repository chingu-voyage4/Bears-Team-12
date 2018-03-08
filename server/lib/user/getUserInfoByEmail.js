const User = require( '../../models/user.js' );

const getUserInfoByEmail = ( email ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        email:  email
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

module.exports = getUserInfoByEmail;