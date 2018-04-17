const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/index.js' );

const homeController = require( '../controllers/home.controller.js' );
const dashboardController = require( '../controllers/dashboard.controller.js' );
const loginController = require( '../controllers/login.controller.js' );
const logoutController = require( '../controllers/logout.controller.js' );
const localAuthentication = passport.authenticate('local', {
                                                  failureRedirect: 'login',
                                                  failureFlash: true });
                                   
const signupController = require('../controllers/signup.controller.js' );                                   
                                  

router.route( '/' ).get( homeController.home );

router.route('/recent').get( homeController.recent ); // new route for recent AJAX call.

router.route( '/dashboard' ).get( dashboardController.getDashboardPage );   ///  new route for dashboard and post type
router.route( '/dashboard' ).post( dashboardController.updateUserProfile );

router.route( '/login' ).get( loginController.getLoginPage );
router.route( '/login' ).post( localAuthentication, loginController.redirectToProfile );

router.route( '/signup').get( signupController.getSignupPage );
router.route( '/signup').post( signupController.createNewUser );

router.route( '/logout' ).get( logoutController.logout );

module.exports = router;