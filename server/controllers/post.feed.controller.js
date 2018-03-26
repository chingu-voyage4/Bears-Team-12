const getAllPosts = require( '../lib/post/getAllPosts.js' );

module.exports = {
  getPostFeed: ( req, res ) => {
    const page = req.query.page;
    getAllPosts( page )
    .then( 
      fulfilled => {
        res.send( fulfilled.data );
      },
      unfulfilled => {
        console.log( 'There was an error while trying to retreive post, ', unfulfilled );
        res.end();
        return;
      })
    .catch( error => console.log( error ) )
  },
}