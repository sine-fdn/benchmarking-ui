import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { sql } from "@/lib/db";
import { SubmitButton } from "@/components/SubmitButton";

export default function Home() {
  async function createSession() {
    "use server";

    const session: Session = {
      sessionID: uuidv4(),
      status: "created",
    };

    await sql`
      INSERT INTO sessions (session_id, status)
      VALUES (${session.sessionID}, ${session.status})
    `;

    redirect(`/session/${session.sessionID}`);
  }

  return (
    <div className="text-center">
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
          <SubmitButton>Start</SubmitButton>
        </form>
      </div>
    </div>
  );
}
