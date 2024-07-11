import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT_URL || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export const postImage = async (key:string, body:string) => {
  const command = new PutObjectCommand({
    Bucket: "picknic-content",
    Key: key,
    Body: body, //ファイルの中身を入れる
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};