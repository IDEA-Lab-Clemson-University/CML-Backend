const userCtrl = require('../controllers/UserController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app) {
    app.get('/api/admin/users', [authJwt.verifyJwtToken,authJwt.isAdminRole], userCtrl.getAllUsers);
    app.get('/api/admin/agents', [authJwt.verifyJwtToken,authJwt.isAdminRole], userCtrl.getAllAgents);
};