import AWS from "aws-sdk";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, R2_ENDPOINT_URL } from "@env";

export const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  endpoint: R2_ENDPOINT_URL,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});
