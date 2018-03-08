const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = require( './post.js' );

const user = new Schema({
  userId:             String,
  userDisplayName:    String,
  posts:              [ postSchema ],
});

var User = mongoose.model( 'users', user );

module.exports = User;