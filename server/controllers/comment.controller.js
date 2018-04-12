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
                res.render('./temp/comment', {
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
        // console.log(req.body);
        // console.log(req.user);
        // console.log(req.params);
        createComment( req.body, req.user, req.params )
        .then(
            fulfilled => {
                console.log('Comment created successfully!');
            },
            unfulfilled => {
                console.log('Comment could not be created...')
            }
        )
        .catch( error => console.log( error ))
    }
    
}