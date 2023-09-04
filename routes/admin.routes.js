const userCtrl = require('../controllers/UserController');
const agentCtrl = require('../controllers/AgentController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app) {
    app.get('/api/admin/users', [authJwt.verifyJwtToken,authJwt.isAdminRole], userCtrl.getAllUsers);
    app.get('/api/admin/agents', [authJwt.verifyJwtToken,authJwt.isAdminRole], agentCtrl.getAllAgents);
};