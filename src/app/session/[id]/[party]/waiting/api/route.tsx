import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);

export async function GET(request: Request) {
  const urlParts = request.url.split("/");
  const id = urlParts[urlParts.length - 4];
  const party = urlParts[urlParts.length - 3];

  if (!id || !party) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const submissions = await sql`
    SELECT * FROM submissions WHERE session_id = ${id}
  `;

  const resultDB = await sql`
    SELECT result FROM sessions WHERE session_id = ${id}
  `;

  const result = resultDB[0].result;

  const response = {
    submissions,
    result,
  };

  return NextResponse.json(response);
}
