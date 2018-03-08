const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/index.js');

const authController = require( '../controllers/auth.controller.js' );

const googleAuthenticationScope = passport.authenticate( 'google', { scope: ['https://www.googleapis.com/auth/plus.login'] } )
const googleAuthentication = passport.authenticate( 'google', { failureRedirect: '/pinterest-app/' } );
const twitterAuthentication = passport.authenticate( ['twitter','google'], { failureRedirect: '/pinterest-app/' } );
const facebookAuthentication = passport.authenticate( 'facebook', { failureRedirect: '/pinterest-app/' } );

router.route( '/getauth').get( authController.getAuth );

router.route( '/twitter' ).get( twitterAuthentication, authController.getAuthTwitter );
router.route( '/twitter/callback' ).get( twitterAuthentication, authController.getAuthTwitterCallback );

router.route( '/facebook').get( facebookAuthentication, authController.getAuthFacebook );
router.route( '/facebook/callback' ).get( facebookAuthentication, authController.getAuthFacebookCallback );

router.get( '/google/', googleAuthenticationScope );
router.route( '/google/callback' ).get ( googleAuthentication, authController.getAuthGoogleCallback );

module.exports = router;