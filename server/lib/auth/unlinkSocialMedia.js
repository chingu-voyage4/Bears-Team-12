const User = require( '../../models/user.js' );

const errorMessage = 'There was an error while attempting to unlink a profile. Please contact an Administrator.';

const unlinkSocialMedia = ( sessionUser, authType ) => {
  return new Promise( ( resolve, reject ) => {
    User.findOne(
      {
        _id:  sessionUser._id
      },
      ( error, user ) => {
        
        switch( authType ){
          
          case 'twitter':
            
            if( user.twitter) user.twitter = undefined;
            
            user.save( error => {
              if ( error ) {
                return reject({
                  error:  error,
                  message: errorMessage
                });
              }
              return resolve();
            });
            break;
            
          case 'facebook':
            
            if( user.facebook ) user.facebook = undefined;
            
            user.save( error => {
              if ( error ) {
                return reject({
                  error:  error,
                  message: errorMessage
                });
              }
              return resolve();
            });
            break;
          
          case 'google':
            
            if( user.google) user.google = undefined;
            
            user.save( error => {
              if ( error ) {
                return reject({
                  error:  error,
                  message: errorMessage
                });
              }
              return resolve();
            });
            break;
            
          default:
            return reject({
              error:    'Unspecified account.',
              message:  errorMessage
            });
        }
        
      }
    )
  })
}


module.exports = unlinkSocialMedia;