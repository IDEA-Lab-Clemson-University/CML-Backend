
const userCtrl = require('../controllers/MediaController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app,upload) { 

    app.post('/api/uploadContent', [authJwt.verifyJwtToken],upload.single('file'), userCtrl.uploadContent);






}