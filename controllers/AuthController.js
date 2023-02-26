const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require("../models/user");
const configSecret = require('../config/config.secret');

//signup
exports.signup = (req, res) => {
    // console.log(req);
    console.log(req.body);
    //{"name":{"first":"snow","last":"yuki"},"age":9,"interests":["i play basketball","skiing","singing"],"agentName":"Wind"}

    let newuser = new User({
        firstName: req.body.name.first,
        lastName: req.body.name.last,
        age: req.body.age,
        // email: req.body.email,
        agentName : req.body.agentName, //uniue
        password: bcrypt.hashSync(req.body.password, 8), //encrypt the password here
        interests: req.body.interests,        
        badges: [],
    });

    //check if user with this agent name already exists
    //if exists warn and ask for new agent name else save the user entity
    User.findOne({
        agentName: req.body.agentName
    }).exec((err, user)=> {

        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(user) {
            //user already exists with same agent name., warn.
            res.status(403).send({message: "User with same agent name already exists"});
            return; 
        } else {
            //save new user
            newuser.save( (err, user)=> {
                if(err) {
                    res.status(500).send({message: err});
                    return;
                }
        
                // res.status(200).send({"message": "Profile created successfully !"});
                // return;

                //send a jwt, after successfull signup
                const token =jwt.sign(
                    {id: user.id},
                    configSecret.secret,
                    { expiresIn: 86400 });

                res.status(200).send({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    // email: user.email,
                    age: user.age,
                    agentName: user.agentName,
                    badges: user.badges,
                    accessToken: token //TBD:
                });
            });
        }         
    });

};


//signin

exports.signin = (req, res) => {

    User.findOne({
        agentName: req.body.agentName
    }).exec((err, user)=> {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(!user) {
            res.status(404).send({message: "Agent info not found"});
            return; 
        }

        //TBD: on credentials password.
        //need to keep session or JWT token to detect which user's request appearing.

        let passwordMatch = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordMatch) {
            res.status(401).send({message: "Invalid Credentials"});
            return;
        }

        //if credentials are correct , send a jwt 
        const token =jwt.sign(
            {id: user.id},
            configSecret.secret,
            { expiresIn: 86400 });

        res.status(200).send({
            firstName: user.firstName,
            lastName: user.lastName,
            // email: user.email,
            age: user.age,
            agentName: user.agentName,
            badges: user.badges,
            accessToken: token //TBD:
        });
    });
};


//sign out
//no endpoint needed as on signout  we will simply delete the JWT token from client side (browser or app)