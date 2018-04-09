const getAllPosts = require( '../lib/post/getAllPosts.js' );

module.exports = {
  home: ( req, res ) => {
    res.render('index', { 
      page: 'index', 
      message: req.flash( 'notification' ),
    });
  },

  recent: (req, res) => {
    const page = req.query.page;
    console.log("Page: " + page);
    getAllPosts ( page )
    .then(
      fulfilled => {
        res.render('./partials/recent', { 
          page: 'index',
          posts: fulfilled.data.posts,
          message: req.flash( 'notification' ),
        });
      }
    ),
    unfulfilled => {
      res.render('recent', { 
        page: 'index',
        message: req.flash( 'notification', 'There was an error retreiving recent posts. Please contact site administrator.' ),
      })
      .catch( error => console.log( 'There was an error while trying to retreive the recent posts feed: ', error ) )
    }
  }
}