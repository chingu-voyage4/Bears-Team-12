const User = require( '../../models/user.js' );
const Post = require( '../../models/post.js' );

const messageToUser = 'There was an error while attempting to remove the post.'

const removePostFromUser = ( userId, postId ) => {
  return new Promise( ( resolve, reject ) => {
    User.findOne(
      {
        _id: userId
      },
      ( error, user ) => {
        if( error ) return reject({
          error:    error,
          message:  messageToUser 
        });
        
        let index = user.posts.indexOf( postId );
        
        if( index < 0 ) return resolve({
          status: 'FAIL',
          message: 'Post does not belong to user.'
        })
        
        user.posts.splice(index,1);
            
        Post.findOne( 
          {
            _id: postId
          },
          ( error, post ) => {
            if( error ) return reject({
              error:    error,
              message:  messageToUser 
            });
            
            if( post.author.id != userId ) return resolve({
              status: 'FAIL',
              message: 'Post does not belong to user.'
            })
            
            user.save(
            (error) => {
              if( error ) return reject({
                error:    error,
                message:  messageToUser 
              });
              
              Post.remove(
                {
                  _id: postId
                },
                ( error, post ) => {
                  if( error ) return reject({
                    error:    error,
                    message:  messageToUser 
                  });
                  
                  return resolve({
                    status: 'SUCCESS',
                    message: 'Post removed successfully',
                  })
                })
            })
         
        })
    
        
      }
    )
    
  })
}

module.exports = removePostFromUser;