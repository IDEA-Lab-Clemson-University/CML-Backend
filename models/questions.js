const mongoose = require('mongoose');

const Question = mongoose.model("questions", new mongoose.Schema({

        question: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
    })
);

module.exports = Question;