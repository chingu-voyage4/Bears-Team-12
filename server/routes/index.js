const express = require( 'express' );
const router = express.Router();
const passport = require( '../lib/passport/index.js' );

const homeController = require( '../controllers/home.controller.js' );
const dashboardController = require( '../controllers/dashboard.controller.js' );
const loginController = require( '../controllers/login.controller.js' );
const logoutController = require( '../controllers/logout.controller.js' );
const localAuthentication = passport.authenticate('local', {
                                                  failureRedirect: '/',
                                                  failureFlash: false });
                                   
const registrationController = require('../controllers/registration.controller.js' );                                   
                                   
                                   
const postfoundController = require('../controllers/post.found.controller.js' );
const postlostController = require('../controllers/post.lost.controller.js' );


router.route( '/' ).get( homeController.home );

router.route( '/dashboard').get( dashboardController.getDashboard );   ///  new route for dashboard and post type
/*

post  routes here

*/
router.route( '/login' ).get( loginController.getLoginPage );
router.route( '/login' ).post( localAuthentication, loginController.redirectHome );

router.route( '/register').get( registrationController.getRegistrationPage );
router.route( '/register').post( registrationController.createNewUser );

router.route( '/logout' ).get( logoutController.logout );

module.exports = router;