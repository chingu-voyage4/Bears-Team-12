//---------------------- User's Wall router ------------------------------------
module.exports = {
  getDashboard: ( req, res ) => {
    const auth = req.isAuthenticated();
    if( !auth ){
      res.redirect('/');
    }
    else{
      res.sendFile(process.cwd() + '/views/dashboard.html');  
    }
  }
}
