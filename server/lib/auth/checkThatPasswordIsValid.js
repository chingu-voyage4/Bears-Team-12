const bcrypt = require('bcryptjs');

const checkThatPasswordIsValid = ( passwordThatWasEntered, saltFromDatabase, hashFromDatabase ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.hash( passwordThatWasEntered, saltFromDatabase, ( error, generatedHash ) => {
      
      if( error ) return reject({
        status: 'ERROR',
        message: error
      });

      if( generatedHash === hashFromDatabase ) return resolve({
        status:   'SUCCESS',
        MESSAGE:  'USER_AUTHENTICATED'
      });

      return resolve({
        status:   'FAIL',
        MESSAGE:  'USER_AUTHENTICATION_FAILED'
      });
      
    });
  });
}

module.exports = checkThatPasswordIsValid;