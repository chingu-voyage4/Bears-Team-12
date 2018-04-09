const bcrypt = require('bcryptjs');

const createSaltAndHash = ( utoken ) => {
  return new Promise( ( resolve, reject ) => {
    
    bcrypt.genSalt( 10, ( error, salt ) => {
      
      if( error ) return reject({
        status: 'ERROR',
        message: error
      });

      bcrypt.hash( utoken, salt, ( error, hash ) => {
        
        if( error ) return reject({
          status: 'ERROR',
          message: error
        });
 
        return resolve({
          status: 'SUCCESS',
          data:{
            salt: salt,
            hash: hash
          }
        });
        
      });
      
    });
  })
};

module.exports = createSaltAndHash;