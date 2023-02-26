

const authCtrl = require('../controllers/AuthController');


module.exports = function(app) {


    //signup
    //NOTE: add middle ware  checks, 
    //used by fresh new agent. ( create profile)
    app.post('/api/auth/signup', authCtrl.signup);


    //signin
    //can be used for returning agent
    app.post('/api/auth/signin', authCtrl.signin);


}