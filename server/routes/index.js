const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/index.js' );

const homeController = require( '../controllers/home.controller.js' );
const profileController = require( '../controllers/profile.controller.js' );
const loginController = require( '../controllers/login.controller.js' );
const logoutController = require( '../controllers/logout.controller.js' );
const localAuthentication = passport.authenticate('local', {
                                                  failureRedirect: 'login',
                                                  failureFlash: true });
                                   
const signupController = require('../controllers/signup.controller.js' );                                   
                                  

router.route( '/' ).get( homeController.home );

router.route( '/profile').get( profileController.getProfilePage );   ///  new route for profile and post type

router.route( '/login' ).get( loginController.getLoginPage );
router.route( '/login' ).post( localAuthentication, loginController.redirectToProfile );

router.route( '/signup').get( signupController.getSignupPage );
router.route( '/signup').post( signupController.createNewUser );

router.route( '/logout' ).get( logoutController.logout );

module.exports = router;