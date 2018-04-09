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
    
    /*const userId = req.user._id;
    const otherId = req.params.id;
    
    if( userId === otherId ){
      // profile belongs to same person who is logged in   <-- res.locals has the data
      // 
     
    }
    else {
      // profile of person other than currently logged in user
      getUserInfoById( userId )
      .then( 
        fulfilled => {
          // do something with fullfilled.data.user
          const { user } = fulfilled;
          res.render( 'profile', {
            page: 'profile',
            userProfile: {
              userName:  user.local ? user.local.username : user.facebook ? user.facebook.name : user.google ? user.google.name : user.twitter ? user.twitter.displayName : 'NO ID',
              posts: user.posts,
            },
            message: req.flash( 'notification' )
          });
          return;
        },
        unfulfilled => {
          req.flash( 'notification', unfulfilled.message );
          res.redirect( '/' );
          return;
        }
      )
      .catch( error => console.log( 'There was an error getting currently logged in user\'s profile: ', error ) );
    }*/
  
  },
  
  updateUserProfile: ( req, res ) => {
    const { oldPassword, newPassword } = req.body;
    checkThatPasswordIsValid( oldPassword, req.user.local.salt, req.user.local.hash )
    .then( 
      
      fulfilled => {
        
        if( fulfilled.status === 'FAILED'){
          req.flash( 'notification', 'Please enter the correct current password' );
          return res.redirect( '/dashboard' );
        }
        console.log( fulfilled)
        return updateUserPassword( req.user._id, newPassword );
        
      },
      
      unfulfilled =>{
        
        req.flash( 'notification', 'There was error attempting to update your profile. Please try again or contact an administrator.');
        return res.redirect( '/dashboard' );
        
      }
    )
    .then(
      
      fulfilled => {
     
        req.flash( 'notification', 'Password updated successfully.' );
        return res.redirect( '/dashboard' );
        
      },
      
      unfulfilled => {
        
        req.flash( 'notification', 'There was error attempting to update your profile. Please try again or contact an administrator.');
        console.log( unfulfilled.error || unfulfilled );
        return res.redirect( '/dashboard' );
        
      }
    )
    .catch( error => console.log( 'There was an error while trying to update a user\'s profile: ', error ) );
  }
}
