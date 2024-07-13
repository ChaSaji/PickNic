import { GetObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./s3";

export const getImage = async (key: string): Promise<string | undefined> => {
  const command = new GetObjectCommand({
    Bucket: "picknic-content",
    Key: key,
  });

  try {
    const response = await client.send(command);
    if (response.Body) {
      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as any) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const base64String = buffer.toString("base64");
      return `data:image/jpeg;base64,${base64String}`;
    }
  } catch (err) {
    console.error(err);
  }
};
