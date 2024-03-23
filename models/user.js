const mongoose = require("mongoose");

const User = mongoose.model(
	"users",
	new mongoose.Schema({
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},

		points: {
			type: Number,
			required: true,
			default: 0,
		},
		badges: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "badges",
			},
		],
		progress: {
			level: {
				type: Number,
				required: true,
				default: 0,
			},
			levelLabel: {
				type: String,
				default: "level-0",
			},
			subLevel: {
				type: Number,
				required: true,
				default: 0,
			},
			subLevelLabel: {
				type: String,
				default: "/entry",
			},
			lastUpdated: {
				type: Date,
				default: new Date(),
			},
		},
		isAdmin: {
			type: Boolean,
			required: false,
			default: false,
		},
        role: {
            type: String,
            required: true,
            enums:['student','user','admin','teacher'],
            default:'user'
        },
	})
);

module.exports = User;
