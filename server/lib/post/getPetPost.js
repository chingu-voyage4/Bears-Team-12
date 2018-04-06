const Post = require( '../../models/post.js' );

const messageToUser = 'There was an error while attempting to retrieve a post from database. Please contact administrator';

const getPetPost = ( postId, type ) => {
  return new Promise( (resolve, reject ) => {
    Post.findOne( 
      {
        _id: postId,
        postType:   type,
      },
      ( error, post ) => {
        if ( error ) {
          return reject({
            error:    error,
            message:  messageToUser 
          });
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