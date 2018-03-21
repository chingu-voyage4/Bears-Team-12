const express = require( 'express' );
const router = express.Router();

const postfoundController = require( '../controllers/post.found.controller.js' );
const postLostController = require( '../controllers/post.lost.controller.js' );

router.route( '/lostpets' ).get( postLostController.getAllLostPetsPage );         // html view all pets
router.route( '/lostpets/all' ).get( postLostController.getAllLostPets );        // database call; grabs a list of lost pets from database sorted by date, currently limited to 10

router.route( 'lostpet/view/:postId' ).get( postLostController.getLostPetPage);   // html view single post
router.route( '/lostpet/:postId' ).get( postLostController.getLostPetPost );     // database call for single post

router.route( '/lostpet' ).post( postLostController.postLostPetPost );

module.exports = router;