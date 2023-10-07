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
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            
            points: {
                type: Number,
                required: true,
                default: 0
            },
            
            badges: [
                {
                type: mongoose.Schema.Types.ObjectId,
                ref: "badges"
            },            
        ],
        isAdmin: {
            type: Boolean,
            required: false,
            default:false
        },

    })
);


module.exports = User ;