const jwt = require('jsonwebtoken');
const configSecret = require('../config/config.secret');


verifyJwtToken = (req, res, next) => {
    //get token from headers
    const token = req.headers['x-access-token'];

    //if token is not there, user is not authorised to access uri
    if(!token) {
        return res.status(403).send({"message": "Unauthorised"});
    }

    //if token is there, then verify its signatures
    jwt.verify(token, configSecret.secret, (err, decodedToken)=> {
        //if some error while decoding token or token is compromised , then send unauthenticated    
        if(err){
            return res.status(401).send({"message": "Unauthorised"});
        }

        //else , get user id from token and attach in request params
        req.params['userId'] = decodedToken.id;
        req.params['isAdmin']=decodedToken.isAdmin
        req.params['role']=decodedToken.role
        next();

    });
}; // verifyJwtToken module ends here

isAdminRole = (req, res, next) => {
    const isAdmin=req.params['isAdmin'];
    if(!isAdmin) {
        return res.status(403).send({"message": "Access denied"});
    }
    next();
};
hasRole = (givenRoles)=>{
 const roles=Array.isArray(givenRoles)?givenRoles:[givenRoles];
 return (req, res, next) => {
    const role=req.params['role'];
    const isAdmin=req.params['isAdmin'];
    
    if(!isAdmin && roles.find(grole=>grole==role)==undefined) {
        return res.status(403).send({"message": "Access denied"});
    }
    next();
};
}

const authJwt = {
    verifyJwtToken,
    isAdminRole,
    hasRole
}

module.exports = authJwt;