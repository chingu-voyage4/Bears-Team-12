module.exports ={
  getLoginPage: ( req, res ) => {
    res.render('login', { 
      page: 'form', 
      message: req.flash('loginMessage'),
    });   
  },
  redirectToProfile: ( req, res ) => {
    req.flash( 'notification', 'You have successfully logged in.' );
    res.redirect( '/' );
  }
}