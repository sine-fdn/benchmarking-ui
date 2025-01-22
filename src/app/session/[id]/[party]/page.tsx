import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);

export default async function Party({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  async function getSession() {
    "use server";

    const { id } = await params;

    const session = await sql`
      SELECT * FROM sessions WHERE session_id = ${id}
    `;

    if (session.length != 1) {
      throw new Error(`Session with id ${id} not found`);
    }

    return session[0];
  }

  const session = await getSession();

  async function handleSubmission(formData: FormData) {
    "use server";

    const { party } = await params;

    const session_id = session.session_id;

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO submissions (session_id, submitter, submission)
      VALUES (${session_id}, ${party}, ${formData.get("value")})
    `;

    redirect(`/session/${session_id}/${party}/waiting`);
  }

  return (
    <div>
      <form action={handleSubmission}>
        <label htmlFor="value">
          Please enter your value for {session.value_name}:
        </label>
        <input type="number" id="value" name="value" />
        <button type="submit">Submit</button>
      </form>
      <p>More information: {session.description}</p>
    </div>
  );
}
