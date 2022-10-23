const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let Question = require("../models/questions");
const configSecret = require('../config/config.secret');

//signup
exports.addQuestion = (req, res) => {

    let newQuestion = new Question({
        question: req.body.question,
        points: req.body.points
    });
    newQuestion.save( (err, question)=> {
        if(err) {
            console.log(err)
            res.status(500).send({"message": 'Error while saving question'});
            return;
        }

        //increase user points
        res.status(200).send({message: "question added  successfully !"});
        return;
    });
    

};