const mongoose      = require('mongoose'),
      Schema        = mongoose.Schema;

const userSchema = new Schema({
    // local auth details
    local:  {
        username: String,
        email: String,
        password: String
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
        username: String
    },
    // google auth details
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

module.exports = mongoose.model("User", userSchema);