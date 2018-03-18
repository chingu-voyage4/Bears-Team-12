module.exports = {
  home: ( req, res ) => {
    res.sendFile(process.cwd() + '/public/index.html');
  }
}