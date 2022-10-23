

const userCtrl = require('../controllers/UserController');
let authJwt = require('../middlewares/auth.jwt')

module.exports = function(app) {


    //get all travel logs of a user
    app.get('/api/travellogs', [authJwt.verifyJwtToken], userCtrl.getAllTravelLogsOfAUser);

    //delete a travel log
    app.delete('/api/users/:userId/travellogs/:travelLogId', [authJwt.verifyJwtToken] ,userCtrl.deleteTravelLog);

     //add a travel log
     app.post('/api/travellogs', [authJwt.verifyJwtToken] ,userCtrl.addTravelLog);

    //achieve a badge
    app.put('/api/users/:userId/badges', [authJwt.verifyJwtToken] ,userCtrl.achieveBadge);


    //get all badges if a user
    app.get('/api/users/:userId/badges', [authJwt.verifyJwtToken], userCtrl.getAllBadgesOfAUser);


}