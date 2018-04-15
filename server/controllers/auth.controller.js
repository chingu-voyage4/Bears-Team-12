//---------------------------- Auth Router -------------------------------------
const getUserInfoById = require( '../lib/user/getUserInfoById.js' );
const createNewUser = require('../lib/auth/createNewUser.js');
const unlinkSocialMedia = require( '../lib/auth/unlinkSocialMedia' ); 

module.exports = {
  
  getUserAuthorization: ( req, res ) => {                  /// <---- maybe a better name for this
    const auth = req.isAuthenticated();
    if( !auth ){
      res.redirect( '/login' );
    }
    else {
      getUserInfoById( req.user.userId )
      .then( promiseResponse => {
        let { user, message } = promiseResponse;
        user.isAuthorized = auth;
        res.send({
          user: {
            isAuthorized: auth,
            userId:           user.userId,
            userDisplayName:  user.userDisplayName,
            posts:            user.posts
          },
          message:  message
        });
      })
      .catch( error => console.log( error ) );
    }
    
  },
  
  getAuthTwitter: ( req, res ) => {
    // Initiates login on with twitter
  },

  getAuthTwitterCallback: ( req, res ) => {
    // Successful authentication, redirect profile.
    req.flash( 'notification', 'You logged in successfully.');
    res.redirect( '/' );
  },
  
  getAuthGoogle: (req, res ) => {
    
  },
  
  getAuthGoogleCallback: ( req, res ) => {
    // Successful authentication, redirect profile.
    req.flash( 'notification', 'You logged in successfully.');
    res.redirect( '/' );
  },
  
  getAuthFacebook: (req, res ) => {
    
  },
  
  getAuthFacebookCallback: ( req, res ) => {
    // Successful authentication, redirect profile.
    req.flash( 'notification', 'You logged in successfully.');
    res.redirect( '/' );
  },
  
  unlink: ( req, res ) => {   // /auth/:authType/unlink etc
    if( !req.isAuthenticated() ){
      req.flash( 'loginMessage', 'You need to be logged in to do that.');
      return res.redirect( '/login' );
    }
    const { user } = req;
    const { authType } = req.params;
    console.log( 'authtype is ', authType )
    unlinkSocialMedia( user, authType)
    .then( 
      fulfilled => {
        req.flash( 'notification', 'Profile unlinked successfully' );
        return res.redirect('/dashboard');
      },
      
      unfulfilled => {
        req.flash( 'notification', unfulfilled.message );
        return res.redirect('/dashboard');
      })
    .catch( error => console.log( error ) );
  }
}

