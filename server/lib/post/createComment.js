const Post = require( '../../models/post.js' );
const User = require( '../../models/user.js' );

const messageToUser = 'There was an error attempting to create your comment. Please try again or contact adminstrator';

const createComment = ( commentData, user ) => {
  return new Promise( ( resolve, reject ) => {
    const { 
      comment
    } = commentData;
    
    Post.findById(req.params.id,
      ( error, post ) => {
        if( error ) {
          return reject({
            error:    error,
            message:  messageToUser 
          });
        }
        let comment = new Comment();
        comment.text = comment

        let commentAuthor = '';
        commentAuthor = user.local ? user.local.username : user.facebook ? user.facebook.name : user.google ? user.google.name : user.twitter ? user.twitter.displayName : 'NO ID';
        comment.author = {
            id: user._id,
            username: commentAuthor
        }
        comment.save( error => {
            if ( error ) {
                return reject({
                    error: error,
                    mesage: messageTouser
                });
            }
            post.comments.push( comment );
            post.save( error => {
                if ( error ) {
                    return reject({
                        error: error,
                        message: messageToUser
                    });
                }
                resolve({
                    status: 'SUCCESS',
                    message: 'Comment created successfully'
                });
            });
        });
      }
    )
  });
}

module.exports = createComment;