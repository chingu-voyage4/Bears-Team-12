const express = require( 'express' );
const router = express.Router();

const postController = require( '../controllers/post.controller.js' );
const commentController = require('../controllers/comment.controller.js');

router.route( '/feed' ).get( postController.getAllPetsPage );

router.route( '/search').get( postController.search );

router.route( '/:postType' ).get( postController.getAllPetsPage );           // html view all lost pets

router.route( '/:postType/new' ).get( postController.getCreatePostPage );

router.route( '/:postType/:postId' ).get( postController.getPetPage);     // html view single post

router.route('/:postType/:postId/comment').get( commentController.getNewCommentPage ) // comment form view

router.route('/:postType/:postId/comment').post( commentController.postNewComment ) // comment submit

// Found routes

/*router.route( '/foundpets' ).get( postFoundController.getAllFoundPetsPage );        // html view all pets

router.route( '/foundpet/new' ).get( postFoundController.getCreateFoundPetPage );

//router.route( '/foundpet/search' ).get( postFoundController.search );

router.route( '/foundpet/:postId' ).get(postFoundController.getFoundPetPage );   // html view for single post

router.route('/foundpet/:postId/comment').get( commentController.getNewCommentPage ) // comment form view

router.route('/foundpet/:postId/comment').post( commentController.postNewComment ) // comment submit*/

module.exports = router;