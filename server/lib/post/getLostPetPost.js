const Post = require( '../../models/post.js' );

const getLostPetPost = ( postId, type ) => {
  return new Promise( (resolve, reject ) => {
    Post.findOne( 
      {
        _id: postId,
        type:   type,
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
            message:  'Lost pet post found',
          });
        }
        else{
          resolve({
            status:   'FAILED',
            message:  'Lost pet post could not be found'
          });
        }
      }
    );
  })
}

module.exports = getLostPetPost;