import { connectDB } from "@/lib/helperFunctions";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

const sql = connectDB();

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
      <form
        action={handleSubmission}
        className="flex flex-col gap-2 justify-center mx-auto mt-6"
      >
        <label htmlFor="value" className="text-xl">
          Please enter your value for {session.value_name}:
        </label>
        <input
          type="number"
          id="value"
          name="value"
          className="border border-green-600 rounded"
        />
        <button
          type="submit"
          className="mt-2 mb-4 border border-green-600 rounded px-2 py-1 bg-green-200"
        >
          Submit
        </button>
      </form>
      <p>More information: {session.description}</p>
    </div>
  );
}
