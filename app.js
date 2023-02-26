const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const APP_PORT = 8001;


//middlewares
// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




//db connection
require('./config/db.config');

//routes

//a dummy route for testing. [remove this later]
app.get('/ping', (req, res)=> {
    return res.json({"msg":"hello from captain Storm"});
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//restrict this endpoint to be used by admins only.
require('./routes/question.routes')(app);


//start application
app.listen(APP_PORT, ()=> {
   console.log('starting SPOT agency backend on port', APP_PORT); 
});