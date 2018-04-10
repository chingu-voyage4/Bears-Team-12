const createComment = require('../lib/post/createComment.js');

module.exports = {
    getNewCommentPage: (req, res) => {
        if ( !req.isAuthenticated() ) {
            req.flash('loginMessage', 'In order to create a comment you must be logged in' );
            res.redirect('/login');
            return;
        }
        res.render('./temp/comment', {
            page: 'form',
            message: req.flash('notification')
        });
    },

    postNewComment: (req, res) => {
        if ( !req.isAuthenticated() ) {
            req.flash('loginMessage', 'In order to create a comment you must be logged in' );
            res.redirect('/login');
            return;
        }
        createComment( req, res );
    }
}