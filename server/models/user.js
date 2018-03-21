const mongoose      = require('mongoose'),
      Schema        = mongoose.Schema,
      postSchema    = require('./post.js');

const userSchema = new Schema({
    // local auth details
    local:  {
        username: String,
        email: String,
        password: String,
        salt:               String,
        hash:               String,
    },
    //facebook auth details
    facebook: {
        id : String,
        token: String,
        name: String,
        email: String
    },
    // twitter auth details
    twitter: {
        id : String,
        token: String,
        displayName: String,
        username: String,
        email:  String
    },
    // google auth details
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    posts: [ {
            type: Schema.Types.ObjectId,
            ref: "Post"
        } ],
});

module.exports = mongoose.model("User", userSchema);