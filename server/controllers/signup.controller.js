const createNewUser = require( '../lib/auth/createNewUser.js' );

module.exports ={
  getSignupPage: ( req, res ) => {
    res.render( 'signup', { 
      page: 'form', 
      message: req.flash( 'signupMessage' )
    });   
  },
  createNewUser: ( req, res ) => {
    const { username, email, password } = req.body;
    createNewUser( username, email, password )
    .then( 
      fulfilled => {
        if ( fulfilled.status === 'SUCCESS' ){
          req.flash('loginMessage', 'You may now login.')
          res.redirect( '/login' );
        }
        else{
          const message = fulfilled.message;
          req.flash( 'signupMessage', message );
          res.redirect( '/signup' );
        }
      },
      unfulfilled => {
        console.log( unfulfilled )
        req.flash( 'signupMessage', unfulfilled.message );
        res.redirect( '/signup' );
        return;
      }
    )
    .catch( error => console.log( 'There was an error while trying to create a new user: ',error ) );
  }
}