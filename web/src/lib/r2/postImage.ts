import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./s3";

export const postImage = async (key: string, body: string) => {
  const buffer = Buffer.from(body.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const command = new PutObjectCommand({
    Bucket: "picknic-content",
    Key: key,
    Body: buffer, //ファイルの中身を入れる
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
