module.exports ={
  getLoginPage: ( req, res ) => {
    res.render('login', { page: 'form' });   
  },
  redirectHome: ( req, res ) => {
    res.redirect('/');
  }
}