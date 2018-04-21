const mongoose      = require('mongoose'),
      Schema        = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    contact: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);