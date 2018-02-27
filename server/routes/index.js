const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/index.js');

const homeController = require( '../controllers/home.controller.js' );
const authController = require( '../controllers/auth.controller.js' );
const dashboardController = require( '../controllers/dashboard.controller.js' );

//const loginController = require( '../controllers/login.controller.js' );   // <--- might not be needed
const logoutController = require( '../controllers/logout.controller.js' );

/*

add controller for lost and found posts here.



*/
const googleAuthenticationScope = passport.authenticate( 'google', { scope: ['https://www.googleapis.com/auth/plus.login'] } )
const googleAuthentication = passport.authenticate( 'google', { failureRedirect: '/pinterest-app/' } )


const twitterAuthentication = passport.authenticate( ['twitter','google'], { failureRedirect: '/pinterest-app/' } );

const facebookAuthentication = passport.authenticate( 'facebook', { failureRedirect: '/pinterest-app/' } );


router.route( '/' ).get( homeController.home );

router.route( '/getauth').get( authController.getAuth );

router.route( '/auth/twitter' ).get( twitterAuthentication, authController.getAuthTwitter );
router.route( '/auth/twitter/callback' ).get( twitterAuthentication, authController.getAuthTwitterCallback );

router.route( '/auth/facebook').get( facebookAuthentication, authController.getAuthFacebook );
router.route( '/auth/facebook/callback' ).get( facebookAuthentication, authController.getAuthFacebookCallback );

router.get( '/auth/google/', googleAuthenticationScope );
router.route( '/auth/google/callback' ).get ( googleAuthentication, authController.getAuthGoogleCallback );

router.route( '/dashboard').get( dashboardController.dashboard );


/*

post  routes here




*/

//router.route( '/login' ).get( loginController.login );
router.route( '/logout' ).get( logoutController.logout );

module.exports = router;