const bcrypt = require('bcryptjs');

const checkThatPasswordIsValid = ( passwordThatWasEntered, saltFromDatabase, hashFromDatabase ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.hash( passwordThatWasEntered, saltFromDatabase, ( error, computedHash ) => {
      if( error ) {
        console.log(error);
        reject({
          status: 'ERROR',
          message: error
        });
      };
      
      if( computedHash == hashFromDatabase ){
        resolve({
          status:   'SUCCESS',
          MESSAGE:  'USER_AUTHENTICATED'
        });
      }
      else {
        resolve({
          status:   'FAIL',
          MESSAGE:  'USER_AUTHENTICATION_FAILED'
        });
      }
    });
  });
}

module.exports = checkThatPasswordIsValid;