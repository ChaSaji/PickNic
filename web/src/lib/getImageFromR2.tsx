import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT_URL || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export const getImage = async (key:string):Promise<string | undefined> => {
    const command = new GetObjectCommand({
        Bucket: "picknic-content",
        Key: key,
    });

    try {
        const response = await client.send(command);
        if (response.Body) {
            const chunks: Uint8Array[]= [];
            for await (const chunk of response.Body as any) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            const base64String = buffer.toString('base64');
            return `data:image/jpeg;base64,${base64String}`
        }
    } catch (err) {
        console.error(err);
    }
}