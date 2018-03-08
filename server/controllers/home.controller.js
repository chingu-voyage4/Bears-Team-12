module.exports = {
  home: ( req, res ) => {
    res.sendFile(process.cwd() + '/views/index.html');
  }
}