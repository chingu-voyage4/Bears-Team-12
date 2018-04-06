const createSaltAndHash = require( './createSaltAndHash.js' );
const getUserInfoByEmail = require( '../user/getUserInfoByEmail.js' ); 
const getUserInfoByUsername = require( '../user/getUserInfoByUsername.js' ); 

const User = require( '../../models/user.js' );

const errorMessage = 'There was an unexpected error. Please try again or contact administrator.';

const createNewUser = ( username, email, password ) => {
  return new Promise( ( resolve, reject ) => {
    getUserInfoByEmail( email )
    .then( fulfilled => {
      if( fulfilled.data.user ){
        resolve({
          status:   'FAILED',
          message:  'EMAIL IS ALREADY IN USE'
        });
      }
      else{
        createSaltAndHash( password )
        .then( fulfilled => {
          let newUser = new User();
          newUser.local = {
            username: username,
            email:    email,
            salt:     fulfilled.data.salt,
            hash:     fulfilled.data.hash
          }
          newUser.posts = [];
          newUser.save( error => {
            if( error ){
              reject({
                error:    error,
                message:  errorMessage
              });
            }
            else{
              resolve({
                status: 'SUCCESS',
                message: 'CREATED NEW USER',
                data:{
                  user: newUser
                }
              })
            }
          })
        })
        .catch( error => reject({
                          error:    error,
                          message:  errorMessage
                        }) );
      }
    })
    .catch( error => reject({
                      error:    error,
                      message:  errorMessage
                    }) );
  })
}

module.exports = createNewUser;