const sqlite = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const app = express();
const APP_PORT = 8001;

//middlewares
app.use(express.urlencoded());
app.use(express.json());


const agents = [
    {
        id: 1,
        name: 'Agent Fern'
    },
    {
        id: 2,
        name: 'Agent Spark'
    },
    {
        id: 3,
        name: 'Agent Rocket'
    },
    {
        id: 4,
        name: 'Agent Gear'
    },
];


//make connection with database
const conn = new sqlite.Database('./spot_agency', (err)=> {
    if(err){
        console.err('error while connecting to database');
        console.err(err);
    } else {
        console.log('connected to database successfully !');
    }
})



//routes
app.get('/ping', (req, res)=> {
    return res.json({"msg":"hello from captain Storm"});
});

//get all agents
app.get('/agents', (req, res)=> {
    let agentsList;
    conn.serialize(()=> {
        conn.all('select * from agents', [], (err, success)=> {
            if(err){
                console.log(err);
            } else {
                agentsList = success;
                 return res.status(200).json(agentsList);
            }
        });
    });
});

//aget all users
app.get('/users', (req, res)=> {
    let users;
    conn.serialize(()=> {
        conn.all('select * from users', [], (err, success)=> {
            if(err){
                console.log(err);
            } else {
                console.log(success);
                users = success;
                return res.status(200).json(success);
            }
        });
    });
});

//add a user (registration)
app.post('/users', (req, res, next)=>{
        let data = req.body;
        let response;
        conn.serialize(()=> {
            //check if user with given username already exists
            conn.get('select * from users where username=?', [data.username], (err, success)=>{
                if(err){
                    // console.log(err);
                } else {
                    if(success) {
                        response = {
                            status: 208,
                            message: "user with username "+data.username+" already exists",
                            data: {}
                        };
                        return res.status(208).json(response);
                    } else {
                          //else insert new user
                        conn.run(`INSERT INTO users(first_name, last_name, username, age, agent_name) values(?,?,?,?,?)`,
                        [data.firstName, data.lastName, data.username, data.age, data.agentName],
                        (err, data)=> {
                            if(err) {
                                console.log(err);
                                response = {
                                    status: 500,
                                    message: "error while inserting new user",
                                    data: {}
                                };
                                return res.status(500).json(response);
                            } else {
                                response = {
                                    status: 200,
                                    message: "user registered successfully",
                                    data: {}
                                };
                                return res.status(200).json(response);
                            }
                        });
                    }
                }
            });          
        });
});


//update user info i.e. first name, last name, age
app.put('/users', (req, res, next)=>{
    let data = req.body;
    let result;
    conn.serialize(()=> {
        //check if user with given username already exists
        conn.get('select * from users where username=?', [data.username], (err, success)=>{
            if(err){
                console.log(err);
            } else {
                if(success) {

                      //else insert new user
                    conn.run(`UPDATE users SET first_name=?, last_name=?, age=?, agent_name=? WHERE username=?`,
                    [data.firstName, data.lastName, data.age, data.agentName, data.username],
                    (err, data)=> {
                        if(err) {
                            console.log('error while updating user '+data.username);
                            console.log(err);
                            result = res.status(500).json({"error": err.msg});
                            return;
                        } else {
                            result = res.status(200).json(data);
                        }
                    });
                }
            }
        });          
    });
    return result;
}); 


/**
 * get list of all badges a user has earned
 * 
 * 
 * 
 */
app.get('/users/:userId/badges', (req, res, next)=> {

    const userId = req.params.userId;
    let userBadges=[];
    conn.serialize(()=> {
        conn.all('select ub.id as badgeId, badge.image_url as image, ub.created_at as badgeEarnDate from user_badges ub inner join badges badge on badge.badge_id=ub.badge_id where ub.user_id=?', [userId], (err, success)=> {
            if(err){
                console.log(err);
            } else {
                userBadges = success;
                if(userBadges==null || userBadges.length==0) {
                    return res.status(404).json(userBadges);
                } else {
                    return res.status(200).json(userBadges);
                }
            }
        });
    });
});

/**
 * get all travel logs of a user
 * 
 */
app.get('/users/:userId/logs', (req, res)=> {
    const userId = req.params.userId;
    let travelLogs=[];
    conn.serialize(()=> {
        conn.all('select * from travel_logs WHERE user_id=?', [userId], (err, success)=> {
            if(err){
                console.log(err);
            } else {
                travelLogs = success;
                if(travelLogs==null || travelLogs.length==0) {
                    return res.status(404).json(travelLogs);
                } else {
                    return res.status(200).json(travelLogs);
                }
            }
        });
    });
});


/**
 * add a travel log
 */
app.post('/users/:userId/logs', (req, res)=> {
    const userId = req.params.userId;
    let response;
    const data = req.body;
    conn.serialize(()=> {
        conn.all('insert into travel_logs (user_id, question_id, description) VALUES(?,?,?)', [userId, data.questionId, data.description], (err, success)=> {
            if(err){
                console.log(err);
            } else {
                response = {
                    status: 200,
                    message: "travel log added successfully",
                    data: {}
                };
                return res.status(200).json(response);
                }
            });
        });
    });


/**
 * get question by question id
 * 
 */
 app.get('/questions/:questionId', (req, res)=> {
    const questionId = req.params.questionId;
    let questionDetails;
    conn.serialize(()=> {
        conn.all('select * from questions WHERE question_id=?', [questionId], (err, success)=> {
            if(err){
                console.log(err);
            } else {
                questionDetails = success;
                if(questionId==null) {
                    return res.status(404).json(questionDetails);
                } else {
                    return res.status(200).json(questionDetails);
                }
            }
        });
    });
});




//start application
app.listen(APP_PORT, ()=> {
   console.log('starting SPOT agency backend on port', APP_PORT); 
});