const Agent = require("../models/agents");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongoose").Types;

//Get All Agents
exports.getAllAgents = (req, res) => {

    const userId = req.params.userId;
    Agent.find().exec((err, agents) => {
        if (err) {
            console.log(err);
            res.status(500).send({ "message": "SYSTEM_MALFUNCTION" });
            return;
        }

        //    const agents=ragents.map(agent=>{
        //             return  {agentName:user.agentName,age:user.age}
        //    });

        return res.status(200).send({ "agents": agents });

    });
};



exports.addAgent = (req, res) => {
    const userId = req.params.userId;
    console.log(userId);

    User.findById(userId).exec((err, user) => {

        if (err) {
            console.log(err);
            res.status(500).send({ "message": "SYSTEM_MALFUNCTION" });
            return;
        }

        //if user is there
        if (user) {
            Agent.findOne({ user: ObjectId(userId) }).exec((err, agentUser) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ "message": "Unable to find Agent for User !" });
                    return;
                }
                if (agentUser) {
                    //agentUser already exists with same agent name., warn.
                    res.status(403).send({ message: "Agent is already associated with current user" });
                    return;
                } else {
                    const data = req.body;
                    let newAgent = new Agent({
                        age: data.age,
                        agentName: data.agentName, //uniue
                        interests: data.interests,
                        user: user
                    });

                    newAgent.save((err, newAgent) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send({ "message": 'Error while saving agent log' });
                            return;
                        }



                        res.status(200).send({ message: "Agent added successfully !" });
                        return;
                    });

                }

            });
        } else {
            res.status(404).send({ message: "User not found !" });
            return;
        }
    });

}