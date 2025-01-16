import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  async function createSession() {
    "use server";

    const session: Session = {
      sessionID: uuidv4(),
      status: "created",
    };

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined");
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      INSERT INTO sessions (session_id, status)
      VALUES (${session.sessionID}, ${session.status})
    `;

    redirect(`/session/${session.sessionID}`);
  }

  return (
    <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1>Welcome to Polytune</h1>
      <div>
        <ul>
          <li />
          Two millionaires meet...
          <li />
          What you can do here
        </ul>
        <form action={createSession}>
          <button type="submit">Start</button>
        </form>
      </div>
    </div>
  );
}
