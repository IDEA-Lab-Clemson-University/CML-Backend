// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./libs/sampleClient.js";

// Set the parameters
const params = {
  Bucket: "mycmlbackendbucket", // The name of the bucket. For example, 'sample-bucket-101'.
  Key: "example.json", // The name of the object. For example, 'sample_upload.txt'.
  Body: "YOUR_JSON_DATA_HERE", // The content of the object. For example, 'Hello world!".
};

const run = async () => {
  // Create an Amazon S3 bucket if it doesn't already exist
  try {
    await s3Client.send(new CreateBucketCommand({ Bucket: params.Bucket }));
    console.log("Bucket created or already exists:", params.Bucket);
  } catch (err) {
    console.error("Error creating bucket:", err);
    return;
  }

  // Upload data to the Amazon S3 bucket
  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log("Data uploaded to S3:", params.Key);
  } catch (err) {
    console.error("Error uploading data to S3:", err);
  }
};

run();
