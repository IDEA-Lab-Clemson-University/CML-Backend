const mongoose = require('mongoose');

const TravelLog = mongoose.model("travellogs", new mongoose.Schema({

    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions"
    },
    description: { //there should be a character limit on this field
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    createdAt: {
        type: Date,
        required: true
    },
})
);

module.exports = TravelLog;