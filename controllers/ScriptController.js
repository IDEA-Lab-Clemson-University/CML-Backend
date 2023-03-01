const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// let User = require("../models/script");
const configSecret = require('../config/config.secret');
const Script = require('../models/scripts');

exports.getScripts = (req, res) => {
    // console.log(req.params)
    // console.log(req.qury)
    const type = req.params.type;
    // console.log(type);

    Script.find({type: type}).exec((err, data)=> {
       
        if(err) {
            console.error(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        //if user is there
        console.log(data);
        if(data) {
            return res.status(200).send(data);
        } else {
            res.status(404).send({message: "scripts of type = "+type+" , not found !!"});
            return;
        }
    });
}