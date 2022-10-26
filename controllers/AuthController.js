const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require("../models/user");
const configSecret = require('../config/config.secret');

//signup
exports.signup = (req, res) => {

    let newuser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        agentName : req.body.agentName,
        password: bcrypt.hashSync(req.body.password, 8), //encrypt the password here
        badges: [],
    });

    newuser.save( (err, user)=> {
        if(err) {
            res.status(500).send({message: err});
            return;
        }

        res.status(200).send({"message": "User registered successfully !"});
        return;
    });

};


//signin

exports.signin = (req, res) => {

    User.findOne({
        email: req.body.email
    }).exec((err, user)=> {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(!user) {
            res.status(404).send({message: "User not found"});
            return; 
        }

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
            email: user.email,
            age: user.age,
            agentName: user.agentName,
            badges: user.badges,
            accessToken: token
        });
    });
};


//sign out
//no endpoint needed as on signout  we will simply delete the JWT token from client side (browser or app)