const User = require( '../../models/user.js' );

const getUserInfo = ( userId ) => {
  return new Promise( (resolve, reject ) => {
    let user = User.findOne(
      {
        userId:   userId
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

module.exports = getUserInfo;