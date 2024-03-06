const userCtrl = require("../controllers/UserController");
let authJwt = require("../middlewares/auth.jwt");

module.exports = function (app) {
	/**
	 * A TravelLog Object
	 * @typedef {object} TravelLog
	 * @property {string} question - Question
	 * @property {string} description - Description
	 * @property {string} user - User
	 * @property {string} createdAt - Created At
	 */

	/**
	 * A AddTravelLogObj Object
	 * @typedef {object} AddTravelLogObj
	 * @property {string} questionId - QuestionId
	 * @property {string} description - Description
	 */

	/**
	 * A Badge Object
	 * @typedef {object} Badge
	 * @property {string} name - Name
	 * @property {string} score - Score
	 * @property {string} image - Image Url
	 * @property {string} achievedOn - Achived On
	 */

	//get all travel logs of a user
	/**
	 * GET /api/travellogs
	 * @summary Get all travel logs of a user
	 * @tags User
	 * @security BasicAuth
	 * @param {string} request.param.userid - UserId
	 * @return {Array<TravelLog>} 200 - success response - application/json
	 * @example response - 200
	 * [{ "question" : "Question-Object-Id",
	 *   "description" : "Test Description",
	 *   "user": "User Name",
	 *   "date": "2023 May 26 11:12:30 "
	 * }]
	 * @return {Error} 500 - Internal Server Error - application/json
	 * @return {Error} 404 - User not found - application/json *
	 * @return {Error} 401 - Invalid credentials/UnAuthorized - application/json *
	 *
	 */
	app.get(
		"/api/travellogs",
		[authJwt.verifyJwtToken],
		userCtrl.getAllTravelLogsOfAUser
	);

	//delete a travel log
	/**
	 * DELETE /api/users/:userId/travellogs/:travelLogId
	 * @summary Delete a travel logr
	 * @tags User
	 * @security BasicAuth
	 * @param {string} request.path.param.userId - User Id
	 * @param {string} request.path.param.travelLogId - Travel Log Id
	 * @return {object} 200 - success response - application/json
	 * @example response - 200
	 * {"message": "Travel log deleted successfully"}
	 * @return {Error} 500 - Internal Server Error - application/json
	 * @return {Error} 404 - User not found  - application/json
	 * @return {Error} 401 - Invalid credentials/UnAuthorized - application/json
	 *
	 */
	app.delete(
		"/api/users/:userId/travellogs/:travelLogId",
		[authJwt.verifyJwtToken],
		userCtrl.deleteTravelLog
	);

	//add a travel log

	/**
	 * POST /api/travellogs
	 * @summary Add a travel log
	 * @tags User
	 * @security BasicAuth
	 * @param {string} request.param.userId - User Id
	 * @param {AddTravelLogObj} request.body.required - Question details
	 * @example   request - payload example
	 * {"questionId":"383a-ad-39s-d93-djkd","description":"Question description"}
	 * @return {object} 200 - success response - application/json
	 * @example response - 200
	 * {message: "Travel log added successfully !"}
	 * @return {Error} 500 - Internal Server Error/Question details not found - application/json
	 * @return {Error} 404 - User not found  - application/json
	 * @return {Error} 401 - Invalid credentials/UnAuthorized - application/json
	 *
	 */
	app.post(
		"/api/travellogs",
		[authJwt.verifyJwtToken],
		userCtrl.addTravelLog
	);

	//achieve a badge
	/**
	 * PUT /api/users/:userId/badges
	 * @summary Achieve a badge
	 * @tags User
	 * @security BasicAuth
	 * @param {string} request.param.userId - User Id
	 * @param {AddTravelLogObj} request.body.required - Badge details
	 * @example   request - payload example
	 * {"name":{"first":"snow","last":"yuki"},"age":9,"interests":["i play basketball","skiing","singing"],"agentName":"Wind"}
	 * @return {UserOutput} 200 - success response - application/json
	 * @example response - 200
	 * { "firstName" : "user.firstName",
	 *   "lastName" : "user.lastName",
	 *  "age": 13,
	 *   "agentName": "user.agentName",
	 *   "badges": ["badge1","badge2"],
	 *   "accessToken": "token"
	 * }
	 * @return {Error} 500 - Internal Server Error/Question details not found - application/json
	 * @return {Error} 404 - User not found  - application/json
	 * @return {Error} 401 - Invalid credentials/UnAuthorized - application/json
	 *
	 */
	app.put(
		"/api/users/:userId/badges",
		[authJwt.verifyJwtToken],
		userCtrl.achieveBadge
	);

	//get all badges if a user
	/**
	 * GET/api/users/:userId/badges
	 * @summary Get all badges if a user
	 * @tags User
	 * @security BasicAuth
	 * @param {string} request.param.userId.required - User Id
	 * @return {Badge} 200 - success response - application/json
	 * @example response - 200
	 * [{ "name" : "BadgeName",
	 *   "score" : "score",
	 *  "image": "https://url.com",
	 *   "achievedOn": "2023-04-20 18:18:30"
	 * }]
	 * @return {Error} 500 - Internal Server Error - application/json
	 * @return {Error} 404 - Agent not found - application/json *
	 * @return {Error} 401 - Invalid credentials - application/json *
	 *
	 */
	app.get(
		"/api/users/:userId/badges",
		[authJwt.verifyJwtToken],
		userCtrl.getAllBadgesOfAUser
	);

	/**
	 * get user's progress
	 * GET /api/users/progress
	 */

	app.get(
		"/api/users/progress",
		[authJwt.verifyJwtToken],
		userCtrl.getUserProgress
	);

	app.put(
		"/api/users/progress",
		[authJwt.verifyJwtToken],
		userCtrl.updateUserProgress
	);
};
