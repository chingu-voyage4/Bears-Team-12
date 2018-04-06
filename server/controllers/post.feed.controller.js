const getAllPosts = require( '../lib/post/getAllPosts.js' );

module.exports = {
  
  getPostFeed: ( req, res ) => {
    const page = req.query.page;
    getAllPosts( page )
    .then( 
      fulfilled => {
        // res.render('./posts/feed', { posts: fulfilled.data.posts, page: 'posts'})
        res.send( fulfilled.data );
      },
      unfulfilled => {
        console.log( 'There was an error while trying to retreive post, ', unfulfilled );
        res.end();
        return;
      })
    .catch( error => console.log( error ) )
  },
  
  getPostFeedPage: ( req, res ) => {
    const page = req.query.page;
    getAllPosts( page )
    .then( 
      fulfilled => {
        res.render('./posts/feed', { 
          posts: fulfilled.data.posts, 
          page: 'posts',
          message: req.flash( 'notification' ),
        })
      },
      
      unfulfilled => {
        req.flash('notification', 'There was an error retreiving the post feed. Please contact and administrator.');
        res.redirect('/');
        return;
      })
    .catch( error => console.log( 'There was an error while trying to retreive the post feed: ', error ) )
  },
  
}