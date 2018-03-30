const express = require( 'express' );
const router = express.Router();

const postFoundController = require( '../controllers/post.found.controller.js' );
const postLostController = require( '../controllers/post.lost.controller.js' );
const postFeedController = require( '../controllers/post.feed.controller.js' );

router.route( '/feed' ).get( postFeedController.getPostFeed );

router.route( '/lostpets/all' ).get( postLostController.getAllLostPets );           // database call; grabs a list of lost pets from database sorted by date, currently limited to 10

router.route( '/lostpet/:postId' ).get( postLostController.getLostPetPost );        // database call for single post

router.route( '/lostpet/new' ).post( postLostController.postLostPetPost );

// Found routes

router.route( '/foundpets/all' ).get( postFoundController.getAllFoundPets );        // database call; grabs a list of found pets from database sorted by date, limited to 10

router.route( '/foundpet/:postId' ).get( postFoundController.getFoundPetPost );     // database call for a single post

router.route( '/foundpet/new' ).post( postFoundController.postFoundPetPost );

module.exports = router;