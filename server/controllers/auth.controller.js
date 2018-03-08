//---------------------------- Auth Router -------------------------------------
const getUserInfo = require( '../lib/user/getUserInfo.js' );

module.exports = {
  
  getAuth: ( req, res ) => {                  /// <---- maybe a better name for this
    const auth = req.isAuthenticated();
    if( !auth ){
      res.redirect( '/login' );
    }
    else {
      getUserInfo( req.user.userId )
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
    // Successful authentication, redirect dashboard.
    res.redirect( '/dashboard' );
  },
  
  getAuthGoogle: (req, res ) => {
    
  },
  
  getAuthGoogleCallback: ( req, res ) => {
    // Successful authentication, redirect dashboard.
    res.redirect( '/dashboard' );
  },
  
  getAuthFacebook: (req, res ) => {
    
  },
  
  getAuthFacebookCallback: ( req, res ) => {
    // Successful authentication, redirect dashboard.
    res.redirect( '/dashboard' );
  }
}

