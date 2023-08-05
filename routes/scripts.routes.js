

const scriptCtrl = require('../controllers/ScriptController');
let authJwt = require('../middlewares/auth.jwt')


module.exports = function(app) {


    //get all scripts
    /**
  * GET /api/scripts/:type
  * @summary Get all scripts
  * @tags Scripts
  * @security BasicAuth
  * @param {string} request.path.param.type - Script Type
  * @return {object} 200 - success response - application/json
  * @return {Error} 500 - Internal Server Error - application/json 
  * @return {Error} 404 - Script type not found - application/json * 
  * @return {Error} 401 - Invalid credentials - application/json *  
  *  
  */
    app.get('/api/scripts/:type', [authJwt.verifyJwtToken], scriptCtrl.getScripts);



}