const agentCtrl = require('../controllers/AgentController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app) {
   /**
 * POST /api/addAgent
 * @summary Add a travel log
 * @tags Agent
 * @security BasicAuth
 * @param {string} request.param.userId - User Id
 * @param {AddAgentObj} request.body.required - Question details
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
   app.post('/api/addagent', [authJwt.verifyJwtToken] ,agentCtrl.addAgent); 
};