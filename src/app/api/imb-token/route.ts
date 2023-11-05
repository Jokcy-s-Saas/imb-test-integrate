import { NextResponse } from "next/server";

const API_KEY = "clob5dcny0000gwtf4sog4dyt";
const API_SECRET = "clob5dcny0001gwtf2dgf4bcr";

export async function GET() {
  const resp = await fetch(
    `http://localhost:3888/api/open/token?appKey=${API_KEY}&appSecret=${API_SECRET}`,
    {
      cache: "no-store",
    }
  );

  const token = await resp.json();

  return NextResponse.json(token);
}
