module.exports = {
  logout: ( req, res ) => {
    if( req.session ){
      req.session.regenerate( ( error ) => {
        if ( error ) console.log( error );
        req.flash('loginMessage', 'You are currently logged out.');
        res.redirect( '/login' );
        return;
      });
    }
  } 
}