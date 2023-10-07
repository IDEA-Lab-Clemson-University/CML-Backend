const mongoose = require('mongoose');

const Media = mongoose.model("media", new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    s3key: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        required: false
    },

    }));

    module.exports = Media ;