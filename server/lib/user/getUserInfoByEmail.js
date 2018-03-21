const User = require( '../../models/user.js' );

const getUserInfoByEmail = ( email ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        'local.email': email
      },
      ( error, user ) => {
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
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