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
    <div>
      <h1 className="text-2xl my-6 font-bold h-full">Welcome to Polytune</h1>
      <div className="flex flex-col h-full justify-between items-center gap-4">
        <p>Two millionaires meet...</p>
        <p>What you can do here</p>
        <form action={createSession}>
          <button
            type="submit"
            className="border border-green-600 rounded px-2 py-1 bg-green-200 mt-6"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
