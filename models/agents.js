const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    agentName: {
        type: String,
        required: true,                        
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    interests: [
        {
            type: String
        }
    ],

});

const Agent = mongoose.model("agents",AgentSchema);
module.exports = Agent;