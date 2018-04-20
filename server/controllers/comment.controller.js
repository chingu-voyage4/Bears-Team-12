const createComment = require('../lib/post/createComment.js');
const getPetPost = require('../lib/post/getPetPost.js');
const Post = require( '../models/post.js' );

module.exports = {
    getNewCommentPage: (req, res) => {
        const { postId } = req.params;
        
        if ( !req.isAuthenticated() ) {
            req.flash('loginMessage', 'In order to create a comment you must be logged in' );
            res.redirect('/login');
            return;
        }
        Post.findById(postId, (error, post) => {
            if (error) {
                console.log(error);
            } else {
                res.render('./commentform', {
                    post: post,
                    page: 'form',
                    message: req.flash('notification')
                });
            }
        });
    },

    postNewComment: (req, res) => {
        if ( !req.isAuthenticated() ) {
            req.flash('loginMessage', 'In order to create a comment you must be logged in' );
            res.redirect('/login');
            return;
        }
        createComment( req.body, req.user, req.params.postId )
        .then(
            fulfilled => {
                req.flash( 'notification', 'Comment was created successfully' );
                res.redirect('/posts/' + req.params.postType +'/' + req.params.postId )
            },
            unfulfilled => {
                console.log( unfulfilled.message )
                req.flash( 'notification', 'There was unexpected error. Please try again or contact an administrator' );
                res.redirect('/posts/' + req.params.postType +'/' + req.params.postId )
            }
        )
        .catch( error => console.log( error ))
    }
    
}