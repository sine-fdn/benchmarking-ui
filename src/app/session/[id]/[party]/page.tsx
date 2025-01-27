import { connectDB } from "@/lib/helperFunctions";
import { redirect } from "next/navigation";

const sql = connectDB();

export default async function Party({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  "use server";

  async function getSession() {
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
    const alias = formData.get("alias") as string;
    const value = formData.get("value") as string;

    const session_id = session.session_id;

    const sql = connectDB();
    await sql`
      INSERT INTO submissions (session_id, submitter, alias, submission)
      VALUES (${session_id}, ${party}, ${alias}, ${value})
    `;

    redirect(`/session/${session_id}/${party}/waiting`);
  }

  const inputClasses = "border border-green-600 rounded";

  return (
    <div>
      <form
        action={handleSubmission}
        className="flex flex-col gap-2 justify-center mx-auto mt-6"
      >
        <label htmlFor="alias" className="text-xl">
          Please enter an alias (e.g. Party 1, Alice, etc.):
        </label>
        <input type="text" id="alias" name="alias" className={inputClasses} />
        <p>Other participants can see your alias</p>

        <label htmlFor="value" className="text-xl mt-4">
          Please enter your value for {session.value_name}:
        </label>
        <input type="number" id="value" name="value" className={inputClasses} />
        <p>Other participants cannot see your input</p>

        <button
          type="submit"
          className="mt-4 mb-4 border border-green-600 rounded px-2 py-1 bg-green-200"
        >
          Submit
        </button>
      </form>
      <p>Description of the value requested: {session.description}</p>
    </div>
  );
}
