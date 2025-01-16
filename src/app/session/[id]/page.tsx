import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

export default function Session({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  async function startSession(formData: FormData) {
    "use server";

    const { id } = await params;

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    const sql = neon(process.env.DATABASE_URL);

    const session = await sql`
        SELECT * FROM sessions WHERE session_id = ${id}
    `;

    if (session.length === 0) {
      throw new Error(`Session with id ${id} not found`);
    }

    const valueName = formData.get("value_name") as string;
    const description = formData.get("description") as string;
    const intervalRange = formData.get("interval_range") as string;

    await sql`
      UPDATE sessions
      SET value_name = ${valueName}, description = ${description}, interval_range = ${intervalRange}
      WHERE session_id = ${id}
    `;

    redirect(`/session/${id}/admin`);
  }

  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <p>
        Verify whether two values are within a certain range of each other
        without having to reveal these values in plain text
      </p>

      <form action={startSession} className="flex flex-col gap-4">
        <label htmlFor="valueName">Name of the Value</label>
        <input type="text" id="valueName" name="value_name" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />
        <label htmlFor="intervalRange">Interval range</label>
        <input type="number" id="intervalRange" name="interval_range" />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
