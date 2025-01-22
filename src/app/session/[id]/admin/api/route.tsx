import { connectDB } from "@/lib/helperFunctions";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const urlParts = request.url.split("/");
  const id = urlParts[urlParts.length - 3];

  if (!id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const sql = connectDB();

  if (!id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const submissions = await sql`
      SELECT * FROM submissions WHERE session_id = ${id}
`;

  const dbResult = await sql`
    SELECT result, interval_range FROM sessions WHERE session_id = ${id}
`;

  if (dbResult.length > 1) {
    return NextResponse.json(
      { error: "Multiple session results found" },
      { status: 500 }
    );
  }

  const { result, interval_range: intervalRange } = dbResult[0];

  const response = {
    submissions,
    result,
    intervalRange,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const urlParts = request.url.split("/");
  const id = urlParts[urlParts.length - 3];

  if (!id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const sql = connectDB();

  if (!id) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const submissions = await sql`
    SELECT * FROM submissions WHERE session_id = ${id}
`;

  const intervalRange = await sql`
  SELECT interval_range FROM sessions WHERE session_id = ${id}
    `;

  const submissionParty1 = submissions[0].submission;
  const submissionParty2 = submissions[1].submission;
  const interval = intervalRange[0].interval_range;

  const difference = submissionParty1 - submissionParty2;

  const result =
    difference <= interval ? '{"result": "true"}' : '{"result": "false"}';

  await sql`
        UPDATE sessions
        SET result = ${result}
        WHERE session_id = ${id}
  `;

  redirect(`/session/${id}/admin`);
}
