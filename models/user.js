const mongoose = require('mongoose');

const User = mongoose.model("users", new mongoose.Schema({
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            // email: {
            //     type: String,
            //     required: true,
            //     unique: true
            // },
            password: {
                type: String,
                required: true
            },
            agentName: {
                type: String,
                required: true,                        
                unique: true
            },
            points: {
                type: Number,
                required: true,
                default: 0
            },
            interests: [
                {
                    type: String
                }
            ],
            badges: [
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: "badges"
            }
        ]

    })
);

module.exports = User ;