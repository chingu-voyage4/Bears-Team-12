module.exports = {
  home: ( req, res ) => {
    res.render('index', { 
      page: 'index', 
      message: req.flash( 'notification' ),
    });
  }
}