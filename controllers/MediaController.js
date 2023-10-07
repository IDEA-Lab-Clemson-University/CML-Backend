const Media = require("../models/media");
const User = require("../models/user");

exports.uploadContent = (req, res) => {

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
            let media = new Media({               
                user: user,
                timestamp: new Date(),
                s3key: "test",
                type:  "audio"
            });
            media.save( (err, newmedia)=> {
                if(err) {
                    console.log(err)
                    res.status(500).send({"message": 'Error while saving media'});
                    return;
                }         
        

                res.status(200).send({message: "Media added successfully !"});
                return;
            });
        } else {
            res.status(404).send({message: "User not found !"});
            return;
        }
    });
}


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
            Question.findOne({id: ObjectId(req.body.questionId)}).exec((err, question)=> {
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
                question: questionData,
                data:  req.body.data
            });
        
            newTravelLog.save( (err, travelLog)=> {
                if(err) {
                    console.log(err)
                    res.status(500).send({"message": 'Error while saving travel log'});
                    return;
                }

                //add points to user
                let updatedPoints = user.points+questionData.points;
                user.updateOne({'points':updatedPoints}, (err, success)=> {
                    if(err) {
                        console.log('user points could not be updated');
                        console.log(err);                        
                        res.status(500).send({"message": err});
                        return;
                    }
                });
        

                res.status(200).send({message: "Travel log added successfully !"});
                return;
            });  
        } else {
            res.status(404).send({message: "User not found !"});
            return;
        }
    });

}