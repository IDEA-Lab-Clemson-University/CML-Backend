const userCtrl = require('../controllers/UserController');
const agentCtrl = require('../controllers/AgentController');
const reportCtrl= require('../controllers/ReportController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app) {
    app.get('/api/admin/users', [authJwt.verifyJwtToken,authJwt.isAdminRole], userCtrl.getAllUsers);
    app.get('/api/admin/agents', [authJwt.verifyJwtToken,authJwt.isAdminRole], agentCtrl.getAllAgents);
    app.get('/api/admin/reports', [authJwt.verifyJwtToken,authJwt.isAdminRole], reportCtrl.generateReport);
};