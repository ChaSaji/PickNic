import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./s3";

export const postImage = async (key: string, body: string) => {
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
