const createComment = require('../lib/post/createComment.js');
const getPetPost = require('../lib/post/getPetPost.js');
const Post = require( '../models/post.js' );
const logErrorAndFlash = require( '../lib/errorHandling/logErrorAndFlash.js' );

module.exports = {
    getNewCommentPage: (req, res) => {
        const { postId } = req.params;
        
        if ( !req.isAuthenticated() ) {
            req.flash('loginMessage', 'In order to create a comment you must be logged in' );
            res.redirect('/login');
            return;
        }
        getPetPost( postId )
        .then( fulfilled => {
            return res.render('./commentform', {
                post: fulfilled.data.post,
                page: 'form',
                message: req.flash('notification')
            });
        })
        .catch( error => {
            req.flash( 'notification', error.message || 'There was an error. Please try again or contact an administrator' );
            console.log( error );
            return res.redirect('/');
        });

    },

    postNewComment: (req, res) => {
        if ( !req.isAuthenticated() ) {
            req.flash('loginMessage', 'In order to create a comment you must be logged in' );
            return res.redirect('/login');
        }
        createComment( req.body, req.user, req.params.postId )
        .then( fulfilled => {
            req.flash( 'notification', 'Comment was created successfully' );
            return res.redirect('/posts/' + req.params.postType +'/' + req.params.postId )
        })
        .catch( error => {
            req.flash( 'notification', error.message || 'There was an error. Please try again or contact an administrator' );
            console.log( error );
            return res.redirect('/posts/' + req.params.postType +'/' + req.params.postId )
        });
    }
    
}