const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect("mongodb+srv://idealab:Clem%240n%21de%40@cluster0.4t0cj04.mongodb.net/spotagency_5", 
// mongoose.connect("mongodb://localhost:27017/spot_agency"
//mongoose.connect(process.env.MONGO_DB_URL, 
{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
    console.log('connected to mongodb database successfully.');
}).catch((err)=> {
    console.log('error connecting to database');
    console.log(err);
});