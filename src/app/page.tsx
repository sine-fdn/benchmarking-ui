import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { connectDB } from "@/lib/helperFunctions";

export default function Home() {
  async function createSession() {
    "use server";

    const session: Session = {
      sessionID: uuidv4(),
      status: "created",
    };

    const sql = connectDB();

    await sql`
      INSERT INTO sessions (session_id, status)
      VALUES (${session.sessionID}, ${session.status})
    `;

    redirect(`/session/${session.sessionID}`);
  }

  return (
    <div className="text-center">
      <h1>Welcome to Polytune</h1>
      <div className="flex flex-col h-full justify-between items-center gap-4">
        <p>
          Secure Multi Party Computation (SMPC) allows several parties to
          perform a computation together without revealing their individual
          inputs. Here is an example:
        </p>
        <Image
          src={"/smpc.png"}
          alt={"SMPC example"}
          width={1000}
          height={1000}
        />
        <p>
          SINE Foundation aims to bring such high end technologies to everyone.
          On this platform, you can use SMPC directly on the browser, no
          cryptographic knowledge required. Give it a try!
        </p>

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
