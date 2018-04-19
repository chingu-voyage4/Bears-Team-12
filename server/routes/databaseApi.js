const express = require( 'express' );
const router = express.Router();

const postController = require( '../controllers/post.controller.js' );

router.route( '/feed' ).get( postController.getAllPets );

router.route( '/:postType/all' ).get( postController.getAllPets );           // database call; grabs a list of lost pets from database sorted by date, currently limited to 10

router.route( '/:postType/:postId' ).get( postController.getPetPost );        // database call for single post

router.route( '/:postType/new' ).post( postController.postPetPost );          // database call to create a new lost pet post

module.exports = router;