import { getImage } from "@/lib/r2/getImage";
import { postImage } from "@/lib/r2/postImage";
import { type NextRequest } from "next/server";

export async function POST(request: Request) {
  const { key, body } = await request.json();
  const src = await postImage(key, body);
  return Response.json({ key, body });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key") || "";
  const src = await getImage(key);

  return Response.json(src);
}
