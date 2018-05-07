//---------------------- User's profile router ------------------------------------
const getUserInfoById = require( '../lib/user/getUserInfoById.js' );
const checkThatPasswordIsValid = require( '../lib/auth/checkThatPasswordIsValid' );
const updateUserPassword = require( '../lib/auth/updateUserPassword.js' );

module.exports = {
  getDashboardPage: ( req, res ) => {
    const auth = req.isAuthenticated();
    
    if( !auth ){
      req.flash( 'loginMessage', 'You must be logged in to do that' );
      return res.redirect('/login');
    }
    
    return res.render( 'dashboard', {
      page: 'dashboard',
      message: req.flash( 'notification' )
    });
  
  },
  
  updateUserProfile: ( req, res ) => {
    
    const { oldPassword, newPassword } = req.body;
    
    checkThatPasswordIsValid( oldPassword, req.user.local.salt, req.user.local.hash )
    .then( fulfilled => {
      if( fulfilled.status !== 'SUCCESS'){
        req.flash( 'notification', 'Please enter the correct current password' );
        return res.redirect( '/dashboard' );
      }
      return updateUserPassword( req.user._id, newPassword )
        .then( fulfilled => {
          req.flash( 'notification', 'Password updated successfully.' );
          return res.redirect( '/dashboard' );
        })
        
    })
    .catch( error => {
      req.flash( 'notification', 'There was error attempting to update your profile. Please try again or contact an administrator.');
      console.log( 'Profile update error: ', error );
      return res.redirect( '/dashboard' );
    })
  }
}
