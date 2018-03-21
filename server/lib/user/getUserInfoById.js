const User = require( '../../models/user.js' );

const getUserInfoById = ( userId ) => {
  return new Promise( (resolve, reject ) => {
    User.findOne(
      {
        _id: userId
      },
      ( error, user ) => {
        
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        }
        else {
          resolve({
            data:{
              user
            },
            message: 'OK',
          });
        }
      });
  });
}

module.exports = getUserInfoById;