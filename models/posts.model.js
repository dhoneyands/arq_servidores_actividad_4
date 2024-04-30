const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    text: {
        type: String,
        required: true,
        minLength: 5,
    },
    author: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;    
            return ret
        }
    }
}
);
 
module.exports = mongoose.model("Post", postSchema);