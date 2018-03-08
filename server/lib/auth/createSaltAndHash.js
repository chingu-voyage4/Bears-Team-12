const bcrypt = require('bcryptjs');

const createSaltAndHash = ( utoken ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.genSalt( 10, ( error, salt ) => {
      if( error ) {
        reject({
          status: 'ERROR',
          message: error
        });
      }
      else{
        bcrypt.hash( utoken, salt, ( error, hash ) => {
          if( error ) {
            reject({
              status: 'ERROR',
              message: error
            });
          }
          else{
            resolve({
              status: 'SUCCESS',
              salt: salt,
              hash: hash
            });
          }
        });
      }
    });
  })
};

module.exports = createSaltAndHash;