const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/user");
const Question = require("../models/questions");
const Badge = require("../models/badges");
const TravelLog = require("../models/travelLogs");

//add travel log
//Note: travel logs is basically an answer to a question.
// Logic:
//add points(energy) when log is added.
// achive baddge when points/energy cross some threshold.
exports.addTravelLog = (req, res) => {
	const userId = req.params.userId;
	console.log(userId);

	User.findById(userId).exec((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		//if user is there
		if (user) {
			let questionData;
			Question.findOne({ id: ObjectId(req.body.questionId) }).exec(
				(err, question) => {
					if (err) {
						console.log(err);
						res.status(500).send({
							message: "Question details not found !",
						});
						return;
					}
					questionData = question;
				}
			);

			let newTravelLog = new TravelLog({
				description: req.body.description,
				user: user,
				createdAt: new Date(),
				question: questionData,
				data: req.body.data,
			});

			newTravelLog.save((err, travelLog) => {
				if (err) {
					console.log(err);
					res.status(500).send({
						message: "Error while saving travel log",
					});
					return;
				}

				//add points to user
				let updatedPoints = user.points + questionData.points;
				user.updateOne({ points: updatedPoints }, (err, success) => {
					if (err) {
						console.log("user points could not be updated");
						console.log(err);
						res.status(500).send({ message: err });
						return;
					}
				});

				res.status(200).send({
					message: "Travel log added successfully !",
				});
				return;
			});
		} else {
			res.status(404).send({ message: "User not found !" });
			return;
		}
	});
};

//edit a travel log
//Only logged in user can edit his/her travel logs
//TODO; discuss this with team.
exports.editTravelLog = (req, res) => {};

//delete a travel log
//Only logged in user can delete his/her travel logs
//TODO: discuss with team, if yes, then should decrease the energy/points ?
exports.deleteTravelLog = (req, res) => {
	const userId = req.params.userId;
	const travelLogId = req.params.travelLogId;

	User.findById(userId).exec((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		//if user is there
		if (user) {
			TravelLog.findOneAndDelete({
				userId: userId,
				_id: travelLogId,
			}).exec((err, travelLogs) => {
				if (err) {
					res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
					return;
				}
			});
		} else {
			res.status(404).send({ message: "User not found !" });
			return;
		}
		return res
			.status(200)
			.send({ message: "Travel log deleted successfully" });
	});
};

//get all travel logs of a user
exports.getAllTravelLogsOfAUser = (req, res) => {
	const userId = req.params.userId;
	console.log(userId);

	User.find({ id: ObjectId(userId) }).exec((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		//if user is there
		console.log(user);
		if (user) {
			TravelLog.find({ user: ObjectId(userId) }).exec(
				(err, travelLogs) => {
					if (err) {
						res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
						return;
					}
					return res.status(200).send(travelLogs);
				}
			);
		} else {
			res.status(404).send({ message: "User not found !" });
			return;
		}
	});
};

//achieve a badge
exports.achieveBadge = (req, res) => {
	const userId = req.params.userId;

	User.findById(userId).exec((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		//console.log(user.points);
		Badge.find({ thresholdEnergy: { $lt: user.points } })
			.sort({ thresholdEnergy: -1 })
			.limit(1)
			.exec((error, badge) => {
				if (err || badge.length == 0) {
					console.log(err);
					res.status(500).send({
						message: "Badge Threshold not reached.",
					});
					return;
				}
				// console.log("Badge Achived",badge)
				// user.badges.push(badge._id)
				// user.save().exec((err,user)=>{
				User.updateOne(
					{ _id: user._id },
					{ $push: { badges: badge._id } }
				).exec((err, user) => {
					if (err) {
						console.log(err);
						res.status(500).send({
							message: "Error while saving badges log",
						});
						return;
					}
					console.log(user);
					res.status(200).send({
						message: "User achived badge successfully !",
					});
					return;
				});

				//get current score (threshold energy) of a user
				//NNED TO WORK ON THIS LOGIC

				// check if badges has been achieved already,
				//if not then , add a badge to user's badges array

				//also insert timestamp when badge was achieved
			});
	});
};

//get all badges of a user
exports.getAllBadgesOfAUser = (req, res) => {
	const userId = req.params.userId;
	console.log(userId);
	User.findById(userId).exec((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		let badges = user.badges.map((badge) => {
			return {
				name: badge.name,
				score: badge.thresholdEnergy,
				image: badge.image_url,
				achievedOn: badge.achievedOn,
			};
		});

		return res.status(200).send({ data: badges });
	});
};

//edit user profile
exports.editUserProfile = (req, res) => {
	const userId = req.params.userId;
	User.findById(userId).exec((err, user) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		if (user) {
			const firstName = req.body.firstName;
			const lastName = req.body.lastName;
			const username = req.body.username;

			User.updateOneAndUpdate(
				{ username: username },
				{ firstName: firstName },
				{ lastName: lastName },
				(err, success) => {
					if (err) {
						console.log(err);
						res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
						return;
					}

					if (success) {
						res.status(200).send({
							message: "user updated successfully.",
						});
						return;
					}
				}
			);
		}
	});
};

//Get All Users
exports.getAllUsers = (req, res) => {
	const userId = req.params.userId;
	User.find().exec((err, users) => {
		if (err) {
			console.log(err);
			res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
			return;
		}

		const modified_users = users.map((user) => {
			return {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				points: user.points,
				badges: user.badges,
			};
		});
		return res.status(200).send({ data: modified_users });
	});
};

exports.getUserProgress = (req, res) => {
	const userId = req.params.userId;
	console.log(userId);
	{
		const userId = req.params.userId;
		console.log(userId);

		User.findById(userId)
			.select("progress")
			.exec((err, user) => {
				if (err) {
					console.log(err);
					res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
					return;
				}

				// if user is there
				if (user) {
					const progress = user.progress;
					return res.status(200).send(progress);
				} else {
					res.status(404).send({ message: "User not found!" });
					return;
				}
			});
	}
};

exports.updateUserProgress = async (req, res) => {
	try {
		console.log("req: ", req.body);
		console.log("i got called.");
		const userId = req.params.userId;
		const { level, levelLabel, subLevel, subLevelLabel } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send({ message: "User not found!" });
		}

		user.progress.level = level;
		user.progress.levelLabel = levelLabel;
		user.progress.subLevel = subLevel;
		user.progress.subLevelLabel = subLevelLabel;
		user.progress.lastUpdated = Date.now();

		const updatedUser = await user.save();
		res.json(updatedUser);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: "SYSTEM_MALFUNCTION" });
	}
};

//endpoint for travelling future->present or vice versa
//this will consume some energy and will update the users points.
//this will also help in achieving some badges to user.
