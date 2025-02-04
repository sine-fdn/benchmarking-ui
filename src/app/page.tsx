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
    <div className="flex flex-col justify-between items-center gap-4">
      <h1>Private Benchmark</h1>
      <p className="max-w-2xl">
        This platform let&apos;s you benchmark the values of three participants{" "}
        <strong>without disclosing their inputs</strong> to each other, nor to a
        third party.
      </p>
      <p className="max-w-2xl">
        Sounds impossible? Not with <strong>Polytune</strong>, SINE
        Foundation&apos;s Secure Multiparty Computation (MPC) engine.
      </p>
      <Image
        src={"/smpc.png"}
        alt={"SMPC example"}
        width={1000}
        height={1000}
      />
      <p className="max-w-2xl">
        SINE Foundation brings advanced cryptography to everyone. You can use it
        in the browser, without any technical knowledge.
      </p>
      <form action={createSession}>
        <SubmitButton>Give it a try!</SubmitButton>
      </form>
    </div>
  );
}
