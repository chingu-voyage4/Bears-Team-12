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

/*const dummyData = require('./dummyData.js');
const User = require('./models/user.js');*/
mongoose.connect( process.env.MONGOLAB_URI );


//-----------------------------------------------------------------------------

//----------------------- Page Rendering ------------------------------
//app.set( "view engine", "pug" );
//app.set( "views", path.join( __dirname, "views" ) );
app.set( 'trust proxy', 1 );

//----------------------- Express Options ----------------------------
app.use( express.static( process.cwd() + '/public' ) );
app.use( bodyParser.json() ); // support json encoded bodies
app.use( bodyParser.urlencoded( { extended: true } ) ); // support encoded bodies
app.use(
  session({ 
    jwt:        null,
    secret:     process.env.SESSION_SECRET,
    cookie: { 
      maxAge:     1000*10*60,
      httpOnly:   true,
      secure:     true,
      path:       '/',
    },
    resave:     true, 
    rolling:    true,
  })
);

app.use( passport.initialize() );
app.use( passport.session() );

//------------------------------------------------------------------------------


const routes = require( './routes/index.js' );
const authentication = require( './routes/authentication.js' );
const posts = require( './routes/posts.js' )

app.use( '/', routes );
app.use( '/auth', authentication );
app.use( '/posts', posts );

app.listen(port, function(){
  console.log("Listening on port ", port)
});

module.exports = {
  app:      app,
  express:  express,
  passport: passport,
}