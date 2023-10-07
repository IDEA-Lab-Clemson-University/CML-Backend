
const userCtrl = require('../controllers/MediaController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app) { 
    
    app.post('/api/uploadContent', [authJwt.verifyJwtToken], userCtrl.uploadContent);






}