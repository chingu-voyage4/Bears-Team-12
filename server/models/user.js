const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require( './post.js' );

const user = new Schema({
  userId:             String,
  username:           String,
  userDisplayName:    String,
  email:              String,
  salt:               String,
  hash:               String,
  posts:              [ postSchema ],
});

var User = mongoose.model( 'users', user );

module.exports = User;