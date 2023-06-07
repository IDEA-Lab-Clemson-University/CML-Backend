

const questionCtrl = require('../controllers/QuestionController');


module.exports = function(app) {

/**
 * A Question Object
 * @typedef {object} Question 
 * @property {string} question - Question
 * @property {number} points - Points
 */
    //signup
    //NOTE: add middle ware  checks,
/**
 * POST /api/questions
 * @summary Add Questions.
 * @tags Question
 * @security BasicAuth
 * @param {Question} request.body.required - user information
 * @example   request - payload example
 * {"question":"How to do?","points":20}
 * @return object Q} 200 - success response - application/json
 * @example response - 200
 * {message: "question added  successfully !"}
 * @return {Error} 500 - Internal Server Error - application/json 
 * @return {Error} 404 - Agent not found - application/json * 
 * @return {Error} 401 - Invalid credentials - application/json * 
 * 
 */ 
    app.post('/api/questions', questionCtrl.addQuestion);


    //signin
    // app.post('/api/auth/signin', authCtrl.signin);


}