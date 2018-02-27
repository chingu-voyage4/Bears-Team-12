const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postType:     String,        // LOST or FOUND .... later ADOPTION
  petName:      String,
  petBreed:     String,
});

module.exports = postSchema;