const express = require( 'express' );
const router = express.Router();

const postController = require( '../controllers/post.controller.js' );

router.route( '/feed' ).get( postController.getAllPets );

router.route( '/lostpets/all' ).get( postController.getAllPets );           // database call; grabs a list of lost pets from database sorted by date, currently limited to 10

router.route( '/lostpet/:postId' ).get( postController.getPetPost );        // database call for single post

router.route( '/lostpet/new' ).post( postController.postPetPost );          // database call to create a new lost pet post

// Found routes

//router.route( '/foundpets/all' ).get( postFoundController.getAllFoundPets );        // database call; grabs a list of found pets from database sorted by date, limited to 10

//router.route( '/foundpet/:postId' ).get( postFoundController.getFoundPetPost );     // database call for a single post

//router.route( '/foundpet/new' ).post( postFoundController.postFoundPetPost );       // database call to create a new lost pet post

module.exports = router;