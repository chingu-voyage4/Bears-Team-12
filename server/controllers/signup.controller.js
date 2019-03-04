const createNewUser = require( '../lib/auth/createNewUser.js' );

module.exports ={
  getSignupPage: ( req, res ) => {
    return res.render( 'signup', { 
      page: 'form', 
      message: req.flash( 'signupMessage' )
    });   
  },
  createNewUser: ( req, res ) => {
    
    const { username, email, password } = req.body;
    
    createNewUser( username, email, password )
    .then( fulfilled => {
      if ( fulfilled.status === 'SUCCESS' ){
        req.flash('loginMessage', 'You may now login.')
        return res.redirect( '/login' );
      }
      else{
        const message = fulfilled.message;
        req.flash( 'signupMessage', message );
        return res.redirect( '/signup' );
      }
    })
    .catch( error => {
      console.log( 'There was an error while trying to create a new user: ', error );
      req.flash( 'signupMessage', error.message || '');
      return res.redirect( '/signup' );
    })
  }
}