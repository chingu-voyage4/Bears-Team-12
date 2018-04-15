const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/index.js');

const authController = require( '../controllers/auth.controller.js' );

const googleAuthentication = passport.authenticate( 'google', { 
                                                    scope: ['email'], 
                                                    failureRedirect: '/login' } );
                                                    
const twitterAuthentication = passport.authenticate( 'twitter', { 
                                                    scope : ['include_email=true'], 
                                                    failureRedirect: '/login' } );
                                                    
const facebookAuthentication = passport.authenticate( 'facebook', { 
                                                    scope : ['email'],
                                                    failureRedirect: '/login' } );
                                                    

router.route( '/getauth').get( authController.getUserAuthorization );

router.route( '/:authType/unlink' ).get( authController.unlink );

router.route( '/twitter' ).get( twitterAuthentication, authController.getAuthTwitter );
router.route( '/twitter/callback' ).get( twitterAuthentication, authController.getAuthTwitterCallback );

router.route( '/facebook').get( facebookAuthentication, authController.getAuthFacebook );
router.route( '/facebook/callback' ).get( facebookAuthentication, authController.getAuthFacebookCallback );

router.route( '/google/' ).get( googleAuthentication, authController.getAuthGoogle );
router.route( '/google/callback' ).get ( googleAuthentication, authController.getAuthGoogleCallback );



module.exports = router;