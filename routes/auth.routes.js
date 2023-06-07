

const authCtrl = require('../controllers/AuthController');


module.exports = function(app) {


    //signup
    //NOTE: add middle ware  checks, 
    //used by fresh new agent. ( create profile)
/**
 * A UserInput Object
 * @typedef {object} UserInput
 * @property {string} name.first.required - The first name
 * @property {string} name.last.required - The last name
 * @property {integer} age - The age - int64
 * @property {Array<string>} interests - interests like "i play basketball","skiing","singing"
 * @property {string} agentName - Agent name
 */

/**
 * A UserOutput Object
 * @typedef {object} UserOutput
 * @property {string} firstName - The first name
 * @property {string} lastName - The last name
 * @property {integer} age - The age - int64
 * @property {Array<string>} badges - badges 
 * @property {string} agentName - Agent name
 *  @property {string} accessToken - Access token
 */

/**
 * A SignIn Object
 * @typedef {object} SignInObject 
 * @property {string} agentName.required - AgentName
 * @property {string} password.required - Password
 * 
 */

/**
 * An Error Object
 * @typedef {object} Error
 * @property {string} message - The error message
 */


/**
 * POST /api/auth/signup
 * @summary Used by fresh new agent. ( create profile)
 * @tags Auth
 * @param {UserInput} request.body.required - user information
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
 * @return {Error} 500 - error response - application/json
 * @example response - 500
 * { "message":"Unable to connect DB"}
 * 
 * @return {Error} 403 - error response - application/json
 * @example response - 403
 * { "message":"User with same agent name already exists"}
 * 
 */
    app.post('/api/auth/signup', authCtrl.signup);


    //signin
    //can be used for returning agent
/**
 * POST /api/auth/signin
 * @summary Can be used for returning agent
 * @tags Auth
 * @param {SignInObject} request.body.required - Credentials
 * @return {UserOutput} 200 - success response - application/json
 * @example response - 200 
 * { "firstName" : "user.firstName",
 *   "lastName" : "user.lastName",
 *  "age": 13,
 *   "agentName": "user.agentName",
 *   "badges": ["badge1","badge2"],
 *   "accessToken": "token"
 * }
 * @return {Error} 500 - Internal Server Error - application/json 
 * @return {Error} 404 - Agent not found - application/json * 
 * @return {Error} 401 - Invalid credentials - application/json * 
 *  
 */
    app.post('/api/auth/signin', authCtrl.signin);


}