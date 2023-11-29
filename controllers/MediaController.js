const Media = require("../models/media");
const User = require("../models/user");
const AWS = require('aws-sdk');

const s3= new AWS.S3({
    region:'us-east-1'
});

const storeInS3Bucket= (file,res,callback)=>{
    const params={
        Bucket:'spot-agency-media-bucket',
        Key:Date.now()+"-"+file.originalname,
        Body: file.buffer
    };

    s3.upload(params,(err,data)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error uploading file to S3');
        }

       // res.send('File uploaded to S3 successfully!');
       callback && callback(data);
    });
};
exports.uploadContent = (req, res) => {

    const userId = req.params.userId;

    User.findById(userId).exec((err, user)=> {
       
        if(err) {
            console.log(err);
            res.status(500).send({"message": "SYSTEM_MALFUNCTION"});
            return;
        }

        //if user is there
        if(user) {
            const file=req.file;
            if(!file){
                return res.status(400).send("No file uploaded.");
            }
            const saveToDB=(responseData)=>{
                
            let media = new Media({               
                user: user,
                timestamp: new Date(),
                s3key: responseData.ETag.replace('"',''),
                type:  file.mimetype
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
        };
        storeInS3Bucket(req,res,saveToDB)

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