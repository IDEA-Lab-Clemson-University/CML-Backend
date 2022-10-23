const mongoose = require('mongoose');

const BadgesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    thresholdEnergy: {
        type: Number,
        required: true
    }

});

module.exports = BadgesSchema;