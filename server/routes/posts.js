const express = require( 'express' );
const router = express.Router();

const postFoundController = require( '../controllers/post.found.controller.js' );
const postLostController = require( '../controllers/post.lost.controller.js' );
const postFeedController = require( '../controllers/post.feed.controller.js' );

router.route( '/feed' ).get( postFeedController.getPostFeed );

router.route( '/lostpets' ).get( postLostController.getAllLostPetsPage );           // html view all pets
router.route( '/lostpets/all' ).get( postLostController.getAllLostPets );           // database call; grabs a list of lost pets from database sorted by date, currently limited to 10

router.route( '/lostpet/view/:postId' ).get( postLostController.getLostPetPage);     // html view single post
router.route( '/lostpet/:postId' ).get( postLostController.getLostPetPost );        // database call for single post

router.route( '/lostpet' ).post( postLostController.postLostPetPost );

// Found routes

router.route( '/foundpets' ).get( postFoundController.getAllFoundPetsPage );        // html view all pets
router.route( '/foundpets/all' ).get( postFoundController.getAllFoundPets );        // database call; grabs a list of found pets from database sorted by date, limited to 10

router.route( '/found/view/:postId' ).get(postFoundController.getFoundPetPage );   // html view for single post
router.route( '/foundpet/:postId' ).get( postFoundController.getFoundPetPost );     // database call for a single post

router.route( '/foundpet' ).post( postFoundController.postFoundPetPost );

module.exports = router;