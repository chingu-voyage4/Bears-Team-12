const express = require( 'express' );
const router = express.Router();

const postFoundController = require( '../controllers/post.found.controller.js' );
const postLostController = require( '../controllers/post.lost.controller.js' );
const postFeedController = require( '../controllers/post.feed.controller.js' );

router.route( '/feed' ).get( postFeedController.getPostFeedPage );

router.route( '/lostpets' ).get( postLostController.getAllLostPetsPage );           // html view all lost pets

router.route( '/lostpet/new' ).get( postLostController.getCreateLostPetPage );

router.route( '/lostpet/:postId' ).get( postLostController.getLostPetPage);     // html view single post

// Found routes

router.route( '/foundpets' ).get( postFoundController.getAllFoundPetsPage );        // html view all pets

router.route( '/foundpet/new' ).get( postFoundController.getCreateFoundPetPage );

router.route( '/foundpet/:postId' ).get(postFoundController.getFoundPetPage );   // html view for single post

module.exports = router;