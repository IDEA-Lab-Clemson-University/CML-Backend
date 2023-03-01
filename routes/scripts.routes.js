

const scriptCtrl = require('../controllers/ScriptController');


module.exports = function(app) {


    //get all scripts
    app.get('/api/scripts/:type', scriptCtrl.getScripts);



}