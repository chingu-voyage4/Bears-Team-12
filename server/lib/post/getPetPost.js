const Post = require( '../../models/post.js' );

const messageToUser = 'There was an error while attempting to retrieve a post from database. Please contact administrator';

const getPetPost = ( postId, type ) => {
  return new Promise( (resolve, reject ) => {
    
    Post.findOne( 
      {
        _id:      postId,
        postType: type,
      })
    .populate('comments')
    .exec(
      ( error, post ) => {
        
        if ( error ) return reject({
          error:    error,
          message:  messageToUser 
        });
        
        if( post ) return resolve({
          data:{
            post: post
          },
          status:   'SUCCESS',
          message:  'Pet post found',
        });
        
        return resolve({
          status:   'FAILED',
          message:  'Pet post could not be found'
        });
      }
    )
  })
}

module.exports = getPetPost;