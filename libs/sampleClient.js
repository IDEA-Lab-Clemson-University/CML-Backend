import { S3Client, CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// Set the AWS Region.
const REGION = "us-east-1"; // Change to your desired region

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

export { s3Client };
