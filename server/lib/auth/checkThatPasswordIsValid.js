const bcrypt = require('bcryptjs');

const checkThatPasswordIsValid = ( passwordThatWasEntered, saltFromDatabase, hashFromDatabase ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.compare( passwordThatWasEntered, saltFromDatabase, ( error, result ) => {
      if( error ) {
        console.log(error);
        reject({
          status: 'ERROR',
          message: error
        });
      }
      else {
        if( result === true ){
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
      }
    });
  });
}

module.exports = checkThatPasswordIsValid;