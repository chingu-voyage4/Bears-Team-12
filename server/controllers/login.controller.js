module.exports ={
  login: ( req, res ) => {
    res.sendFile(process.cwd() + '/views/login.html'); 
  }
}