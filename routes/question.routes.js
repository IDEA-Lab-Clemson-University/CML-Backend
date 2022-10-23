

const questionCtrl = require('../controllers/QuestionController');


module.exports = function(app) {


    //signup
    //NOTE: add middle ware  checks, 
    app.post('/api/questions', questionCtrl.addQuestion);


    //signin
    // app.post('/api/auth/signin', authCtrl.signin);


}