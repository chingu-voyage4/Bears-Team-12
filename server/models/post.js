const mongoose      = require('mongoose'),
      Schema        = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    image: String,
    name: String,
    tags: [String],                 // Array of user provided strings that allow for easy search results.
    postType: String,               // LOST or FOUND
    petType: {                      // Determined by petChoice Radio button.
        petCategory: String,        // Selected radio button (Cat, Dog, Other)
        otherType: String           // if Other, user inputted string.
    },
    breed: String,
    gender: String,
    age:    Number,
    color:  String,
    createdAt: {                    // the date the post was created
        type: Date,
        default: Date.now
    },
    date: String,                   // the date the user inputs, stored in string format.
    description: String,           // pet description
    tagInput: String,   
    location: {
        street: String,
        city: String,
        state: String,
        postal: String 
    },
    lost: {
        areaDesc: String,
        chipped: String,
        incident: String,
        
    },
    found: {
        incident: String,
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        contact:    String,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Post", postSchema);