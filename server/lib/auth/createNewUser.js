const createSaltAndHash = require( './createSaltAndHash.js' );
const getUserInfoByEmail = require( '../user/getUserInfoByEmail.js' ); 
const getUserInfoByUsername = require( '../user/getUserInfoByUsername.js' ); 

const User = require( '../../models/user.js' );

const createNewUser = ( username, email, password ) => {
  return new Promise( ( resolve, reject ) => {
    getUserInfoByEmail( email )
    .then( fulfilled => {
      if( fulfilled.user ){
        resolve({
          status:   'FAILED',
          message:  'EMAIL IS ALREADY IN USE'
        });
      }
      else{
        getUserInfoByUsername( username )
        .then( fulfilled => {
          if( fulfilled.user ){
            resolve({
              status:   'FAILED',
              message:  'USERNAME ALREADY IN USE'
            });
          }
          else{
            createSaltAndHash( password )
            .then( fulfilled => {
              let newUser = new User();
              newUser.username = username;
              newUser.userDisplayName = username;
              newUser.email = email;
              newUser.salt = fulfilled.salt;
              newUser.hash = fulfilled.hash;
              newUser.save( error => {
                if( error ){
                  reject( error );
                }
                else{
                  resolve({
                    status: 'SUCCESS',
                    message: 'CREATED NEW USER'
                  })
                }
              })
            })
            .catch( error => reject( error ) );
          }
        })
        .catch( error => reject( error ) );
      }
    })
    .catch( error => reject( error ) );
  })
}

module.exports = createNewUser;