const createSaltAndHash = require( './createSaltAndHash.js' );
const User = require( '../../models/user.js' );

const updateUserPassword = ( userId, newPassword ) => {
  return new Promise( ( resolve, reject ) => {
    createSaltAndHash( newPassword )
    .then( 
      fullfilled => {
        const { salt, hash } = fullfilled.data;
        User.findOne(
          {
            _id:  userId
          },
          ( error, user ) => {
            if( error ) return reject({
              status: 'ERROR',
              message: error
            });
            
            user.local.salt = salt;
            user.local.hash = hash;
            
            user.save( error => {
              if( error ) return reject({
                status: 'ERROR',
                message: error
              });
              return resolve({
                status:   'SUCCESS',
                message:  'Password was updated successfully.'
              });
            });
          }
        )
      },
      
      unfulfilled => {
        return reject( unfulfilled );
      })
    .catch( error =>{  
      return reject({
        status: 'ERROR',
        message: error
      });
    });
  });
}