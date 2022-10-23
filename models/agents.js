const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

});

module.exports = AgentSchema;