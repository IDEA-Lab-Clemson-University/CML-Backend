

const authCtrl = require('../controllers/AuthController');


module.exports = function(app) {


    //signup
    //NOTE: add middle ware  checks, 
    app.post('/api/auth/signup', authCtrl.signup);


    //signin
    app.post('/api/auth/signin', authCtrl.signin);


}