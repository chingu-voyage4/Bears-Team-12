const logErrorAndFlash = ( error, flash ) => {
  flash( 'notification', error.message || 'There was an error. Please try again or contact an administrator' );
  console.log( error );
}

module.exports = logErrorAndFlash;