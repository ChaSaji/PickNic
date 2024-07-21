import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
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

const listImages = async (prefix: string): Promise<string[]> => {
  const command = new ListObjectsV2Command({
    Bucket: "picknic-content",
    Prefix: prefix,
  });

  try {
    const response = await client.send(command);
    return response.Contents?.map((item) => item.Key!) || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export async function getImages(
  prefix: string
): Promise<{ key: string; imageData: string }[]> {
  const keys = await listImages(prefix);
  const promises = keys.map(async (key) => {
    const imageData = await getImage(key);
    return { key, imageData: `${imageData}` };
  });

  return Promise.all(promises);
}
