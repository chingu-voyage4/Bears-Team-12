const Post = require( '../../models/post.js' );

const getPetPost = ( postId, type ) => {
  return new Promise( (resolve, reject ) => {
    Post.findOne( 
      {
        _id: postId,
        postType:   type,
      },
      ( error, post ) => {
        if ( error ) {
          console.log( error );
          reject( "ERROR" );
        }
        else if( post ) {
          resolve({
            data:{
              post: post
            },
            status:   'SUCCESS',
            message:  'Pet post found',
          });
        }
        else{
          resolve({
            status:   'FAILED',
            message:  'Pet post could not be found'
          });
        }
      }
    );
  })
}

module.exports = getPetPost;