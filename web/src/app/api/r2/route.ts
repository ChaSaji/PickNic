import { getImage, getImages } from "@/lib/r2/getImage";
import { postImage } from "@/lib/r2/postImage";
import { type NextRequest } from "next/server";

export async function POST(request: Request) {
  const { key, body } = await request.json();
  const src = await postImage(key, body);
  return Response.json({ key, body });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key");
  const prefix = searchParams.get("prefix");

  if (key) {
    const image = await getImage(key);
    if (!image) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ key, imageData: image }), {
      status: 200,
    });
  }

  if (prefix) {
    const images = await getImages(prefix);
    return new Response(JSON.stringify(images), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "No key or prefix provided" }), {
    status: 400,
  });
}
