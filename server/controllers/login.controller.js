module.exports ={
  getLoginPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/public/login.html');   
  },
  redirectHome: ( req, res ) => {
    res.redirect('/');
  }
}