module.exports ={
  getLoginPage: ( req, res ) => {
    res.sendFile(process.cwd() + '/views/login.html');   
  },
  redirectHome: ( req, res ) => {
    res.redirect('/dashboard')
  }
}