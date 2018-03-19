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
          resolve( {
            status:   'SUCCESS',
            data: {
              recentPosts: recentPosts
            },
            message: 'OK'
          });
        }
      });
  });
}

module.exports = getRecentPosts;