const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Question = require("../models/questions");
const Badge = require("../models/badges");
const TravelLog = require("../models/travelLogs");


//add travel log
//Note: travel logs is basically an answer to a question.
exports.addTravelLog = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);

    User.findById(userId).exec((err, user)=> {
       
        if(err) {
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        //if user is there
        if(user) {
            let questionData ;
            Question.findById(req.body.questionId).exec((err, question)=> {
                if(err){
                    console.log(err);
                    res.status(500).send({"message": "Question details not found !"});
                    return;
                }
                questionData = question;

            });

            let newTravelLog = new TravelLog({
                description: req.body.description,
                user: user,
                createdAt: new Date(),
                question: questionData
            });
        
            newTravelLog.save( (err, travelLog)=> {
                if(err) {
                    console.log(err)
                    res.status(500).send({"message": 'Error while saving travel log'});
                    return;
                }
        
                //increase user points
                res.status(200).send({message: "Travel log added successfully !"});
                return;
            });  
        } else {
            res.status(404).send({message: "User not found !"});
            return;
        }
    });

}


//edit a travel log
//Only logged in user can edit his/her travel logs
exports.editTravelLog = (req, res) => {
    
}

//delete a travel log
//Only logged in user can delete his/her travel logs
exports.deleteTravelLog = (req, res) => {
    const userId = req.params.userId;
    const travelLogId = req.params.travelLogId;

    User.findById(userId).exec((err, user)=> {
       
        if(err) {
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        //if user is there
        if(user) {
            TravelLog.findOneAndDelete({"userId": userId, "_id": travelLogId }).exec((err, travelLogs)=> {
                if(err){
                    res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
                    return;
                }
            });
        } else {
            res.status(404).send({message: "User not found !"});
            return;
        }
        return res.status(200).send({"message": "Travel log deleted successfully"});
    });
};


//get all travel logs of a user
exports.getAllTravelLogsOfAUser = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    let logs=[];
    User.findById(userId).exec((err, user)=> {
       
        if(err) {
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        //if user is there
        if(user) {
            TravelLog.find({"userId": userId}).exec((err, travelLogs)=> {
                if(err){
                    res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
                    return;
                }
               logs =  travelLogs;
            });
        } else {
            res.status(404).send({message: "User not found !"});
            return;
        }
        return res.status(200).send(logs);
    });
};

//achieve a badge 
exports.achieveBadge = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    User.findById(userId).exec((err, user)=> {
       
        if(err) {
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        //get current score (threshold energy) of a user
        //NNED TO WORK ON THIS LOGIC

        // check if badges has been achieved already, 
        //if not then , add a badge to user's badges array

            //also insert timestamp when badge was achieved


    });

};


//get all badges of a user
exports.getAllBadgesOfAUser = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    User.findById(userId).exec((err, user)=> {
       
        if(err) {
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        
        let badges = user.badges.map(badge=> {
            return {
                name: badge.name,
                score: badge.thresholdEnergy,
                image: badge.image_url,
                achievedOn: badge.achievedOn
            }
        });

        return res.status(200).send({"data": badges});

    });


};

//edit user profile
exports.editUserProfile = (req, res) => {

    const userId = req.params.userId;
    User.findById(userId).exec((err, user)=> {
        if(err){
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        if(user){

            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const username = req.body.username;
            const agentName = req.body.agentName;

            User.updateOneAndUpdate({ 'username' : username}, {'firstName': firstName},  {'lastName': lastName},  {'agentName': agentName}, (err, success)=> {
                if(err){
                    console.log(err);
                    res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
                    return;
                }

                if(success){
                    res.status(200).send({"message": "user updated successfully."});
                    return;
                }
            });
           
        }
    });
};
