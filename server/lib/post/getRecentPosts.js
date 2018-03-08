const Post = require( '../../models/post.js' );

const getRecentPosts = () => {
  return new Promise( ( resolve, reject ) => {
    Post.find( {} )
      .sort( { date: -1 })
      .limit( 20 )
      .exec( ( error, recentImages ) => {
        if( error ){
          console.log( error );
          reject( error );
        }
        else {
          resolve( recentImages )
        }
      });
  });
}

module.exports = getRecentPosts;