"use server";

import { redirect } from "next/navigation";
import { sql } from "./db";

export default async function handleSubmission(
  alias: string,
  session_id: string,
  party: string
) {
  "use server";

  const submission = await sql`
      SELECT submissions FROM submissions WHERE session_id = ${session_id} AND submitter = ${party}
    `;

  if (submission.length != 0) {
    console.log(
      `Submission for party ${party} already exists, redirecting to waiting page`
    );
    redirect(`/session/${session_id}/${party}/waiting`);
  }

  await sql`
      INSERT INTO submissions (session_id, submitter, alias)
      VALUES (${session_id}, ${party}, ${alias})
    `;

  redirect(`/session/${session_id}/${party}/waiting`);
}
