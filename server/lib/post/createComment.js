const Post = require( '../../models/post.js' );
const User = require( '../../models/user.js' );
const Comment = require('../../models/comment');

const messageToUser = 'There was an error attempting to create your comment. Please try again or contact adminstrator';

const createComment = ( commentData, user, postId ) => {
  return new Promise( ( resolve, reject ) => {
    const { 
      commentBody, commentContact
    } = commentData;

    Post.findById(postId,
      ( error, post ) => {
        if( error ) {
          return reject({
            error:    error,
            message:  messageToUser 
          });
        }
        let comment = new Comment();
        comment.text = commentBody;
        comment.contact = commentContact;

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
                    mesage: messageToUser
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