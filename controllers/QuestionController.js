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

exports.getAllQuestions = (req, res) => {

   
    Question.find().exec((err, questions)=> {
        if(err) {
            console.log(err)
            res.status(500).send({"message": 'Error while fetching  questions'});
            return;
        }

        
        res.status(200).send({data:questions});
        return;
    });
    

};

exports.getQuestionById = (req, res) => {

    const questionId = req.params.questionId;
   
    Question.findById(questionId).exec((err, question)=> {
        if(err) {
            console.log(err)
            res.status(500).send({"message": 'Error while fetching  question'});
            return;
        }

        
        res.status(200).send(question);
        return;
    });
    

};