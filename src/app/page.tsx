import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { sql } from "@/lib/db";
import { SubmitButton } from "@/components/SubmitButton";

export default function Home() {
  async function startSession(formData: FormData) {
    "use server";

    const session: Session = {
      sessionID: uuidv4(),
      status: "created",
    };

    await sql`
      INSERT INTO sessions (session_id, status)
      VALUES (${session.sessionID}, ${session.status})
    `;

    const id = session.sessionID;
    const valueName = formData.get("value_name") as string;
    const description = formData.get("description") as string;
    const intervalRange = formData.get("interval_range") as string;

    await sql`
      UPDATE sessions
      SET value_name = ${valueName}, description = ${description}, interval_range = ${intervalRange}
      WHERE session_id = ${id}
    `;

    redirect(`/session/${id}/links`);
  }

  const inputClasses =
    "border-4 border-sine-purple rounded-xl px-2 text-right mx-1.5";

  return (
    <div className="flex flex-col justify-between items-center gap-4 max-w-2xl">
      <h1>Private Benchmark</h1>
      <p>
        This platform let&apos;s you benchmark the values of three participants{" "}
        <strong>without disclosing their inputs</strong> to each other, nor to a
        third party.
      </p>
      <p>
        Sounds impossible? Not with <strong>Polytune</strong>, SINE
        Foundation&apos;s Secure Multiparty Computation (MPC) engine.
      </p>
      <p>
        SINE Foundation brings advanced cryptography to everyone. You can use it
        in the browser, without any technical knowledge.
      </p>
      <div className="border border-black rounded-3xl p-4 mt-6">
        <p className="text-xl font-bold mb-6">Give it a try!</p>
        <form
          action={startSession}
          className="flex flex-col gap-4 items-center"
        >
          <p className="text-l max-w-2xl text-center leading-8">
            For 3 participants, check whether their
            <input
              type="text"
              id="valueName"
              name="value_name"
              className={`w-36 ${inputClasses}`}
              placeholder="CO2e emissions"
              required
            />
            in
            <input
              type="text"
              id="description" // TODO: change to UNIT
              name="description" // TODO: Change to UNIT
              required
              placeholder="kg"
              className={`w-14 ${inputClasses}`}
            />
            are within a
            <input
              type="number"
              id="intervalRange"
              name="interval_range"
              className={`w-16 ${inputClasses}`}
              placeholder="10"
              required
            />
            % range of each other. <em>Privately</em>, using strong encryption
            built by SINE Foundation.
          </p>
          <SubmitButton>Start</SubmitButton>
        </form>
      </div>
    </div>
  );
}
