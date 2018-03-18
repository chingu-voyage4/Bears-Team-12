const mongoose      = require('mongoose'),
      Schema        = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    image: String,
    type: String,
    breed: String,
    gender: String,
    createdAt: { // the date the post was created
        type: Date,
        default: Date.now
    },
    date: String, // the date the user inputs, stored in string format.
    description: String,
    location: {
        street: String,
        city: String,
        state: String,
        postal: String 
    },
    lost: {
        name: String,
        areaDesc: String,
        chipped: String,
        incident: String
    },
    found: {
        incident: String
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Post", postSchema);