const Post = require( '../../models/post.js' );

const getRecentPosts = () => {
  return new Promise( ( resolve, reject ) => {
    Post.find( {} )
      .sort( { date: -1 })
      .limit( 20 )
      .exec( ( error, recentPosts ) => {
        if( error ){
          console.log( error );
          reject( error );
        }
        else {
          resolve( recentPosts );
        }
      });
  });
}

module.exports = getRecentPosts;