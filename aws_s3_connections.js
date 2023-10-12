const AWS = require('aws-sdk');
const mongoose = require('mongoose');

AWS.config.update({
  accessKeyId: 'AKIA2P4YU5QHCSEJ4PPF',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new AWS.S3(); // Create an S3 object after configuring AWS


// mongoose.connect('mongodb+srv://idealab:Clem%240n%21de%40@cluster0.4t0cj04.mongodb.net/spotagency_5', 
const db=mongoose.createConnection(process.env.MONGO_DB_URL,

{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');

  
  const collectionNames = ['agents', 'badges', 'questions', 'scripts', 'travellogs', 'users'];

  // Function to process and upload data for each collection
  const processCollection = async (collectionName) => {
    const collection = db.collection(collectionName);

    // Fetch data from MongoDB
    const data = await collection.find({}).toArray();

    // Process your data as needed (in this example, we'll convert it to JSON)
    const jsonData = JSON.stringify(data);

    // Define S3 bucket and file information
    const params = {
      Bucket: 'mycmlbackendbucket',
      Key: `${collectionName}.json`, // Use the collection name as the S3 object key
      Body: jsonData,
      ContentType: 'application/json',
    };

    // Upload data to S3
    try {
      const s3Data = await s3.upload(params).promise();
      console.log(`Successfully uploaded data from ${collectionName} to S3: ${s3Data.Location}`);
    } catch (s3Err) {
      console.error(`Error uploading data from ${collectionName} to S3: ${s3Err}`);
    }
  };

  // Process each collection
  Promise.all(collectionNames.map(processCollection))
    .then(() => {
      // Close the MongoDB connection after processing all collections
     db.close();
     console.log("DB Connection Closed");
    })
    .catch((err) => {
      console.error('Error processing collections:', err);
     db.close();
    });
});

