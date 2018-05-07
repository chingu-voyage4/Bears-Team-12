const createSaltAndHash = require( './createSaltAndHash.js' );
const User = require( '../../models/user.js' );

const messageToUser = 'There was an error. Please try again or contact an administrator.';

const updateUserPassword = ( userId, newPassword ) => {
  return new Promise( ( resolve, reject ) => {
    if( newPassword.length < 4 || newPassword.match(/\s/)) {
      return reject({
        message: 'New password must be greater than 5 or more characters long and contain no spaces.'
      });
    }
    
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
              error:  error,
              message: messageToUser
            });
            
            user.local.salt = salt;
            user.local.hash = hash;
            
            user.save( error => {
              if( error ) return reject({
                status: 'ERROR',
                error:  error,
                message: messageToUser
              });
              return resolve({
                status:   'SUCCESS',
                message:  'Password was updated successfully.'
              });
            });
          }
        )
      })
    .catch( error =>{  
      return reject({
        status:   'ERROR',
        message:  messageToUser,
        error:    error,
      });
    });
  });
}

module.exports = updateUserPassword;