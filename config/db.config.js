const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/spot_agency", 
{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
    console.log('connected to mongodb database successfully.');
}).catch((err)=> {
    console.log('error connecting to database');
    console.log(err);
});