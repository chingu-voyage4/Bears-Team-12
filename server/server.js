'use strict';
require('dotenv').config()
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const axios = require('axios')
const passport = require( './lib/passport/index.js' );

const app = express();
const port = process.env.PORT || 3000;

/*------------------------------------------------------------------------------
---------------------------- Mongoose and Schemas ------------------------------
------------------------------------------------------------------------------*/

mongoose.connect( process.env.MONGOLAB_URI );


//----------------------- Page Rendering ------------------------------
app.set( "view engine", "ejs" );
//app.set( 'trust proxy', 1 );

//----------------------- Express Options ----------------------------
app.set('images', process.cwd() + '/public/user/images');
app.use( express.static( process.cwd() + '/public' ) );
app.use( bodyParser.json() ); // support json encoded bodies
app.use( bodyParser.urlencoded( { extended: false } ) ); // support encoded bodies
app.use(
  session({ 
    jwt:        null,
    secret:     process.env.SESSION_SECRET,
    cookie: { 
      maxAge:     1000*10*60,
      httpOnly:   true,
      secure:     false,
      path:       '/',
    },
    resave:     true, 
    rolling:    true,
  })
);

app.use( passport.initialize() );
app.use( passport.session() );


//-------------------------Message Flashing-------------------------------------
const flash = require( 'connect-flash' );
app.use( flash() );

// ----------------------------- Routes ----------------------------------------

const routes = require( './routes/index.js' );
const socialMediaAuthentication = require( './routes/socialMediaAuthentication.js' );
const posts = require( './routes/posts.js' );
const databaseApi = require( './routes/databaseApi.js' );

app.locals.moment = require('moment');

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use( '/', routes );
app.use( '/auth', socialMediaAuthentication );
app.use( '/posts', posts );
app.use( '/api', databaseApi );

app.listen(port, function(){
  console.log("Listening on port ", port)
});

module.exports = {
  app:      app,
  express:  express,
  passport: passport,
}