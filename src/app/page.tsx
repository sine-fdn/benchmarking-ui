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
    "border-4 border-sine-green rounded-xl px-2 text-right mx-1.5";

  return (
    <div className="flex flex-col justify-between items-center gap-12 max-w-2xl">
      <div>
        <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
        <h2>
          by{" "}
          {/* <a
            href="https://sine.foundation"
            className="underline decoration-sine-purple decoration-4"
          > */}
          SINE Foundation
          {/* </a> */}
        </h2>
      </div>
      <p className="max-w-xl leading-7">
        With SINE&apos;s private benchmark, three participants can benchmark a
        value <strong>without disclosing their inputs</strong> and{" "}
        <strong>without sharing any data with SINE</strong>.
      </p>
      <p className="max-w-xl leading-7">
        <strong>Polytune</strong>, SINE&apos;s Secure Multi-Party Computation
        (MPC) engine, brings advanced cryptography to everyone. You can use it
        in the browser, without any technical knowledge.
      </p>
      <div className="border border-black rounded-3xl p-4 w-2xl">
        <p className="text-xl font-bold mb-6">Give it a try!</p>
        <form
          action={startSession}
          className="flex flex-col gap-4 items-center"
        >
          <p className="text-l max-w-2xl text-center leading-7">
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
            are within
            <input
              type="number"
              id="intervalRange"
              name="interval_range"
              className={`w-16 ${inputClasses}`}
              placeholder="10"
              required
            />
            % of each other. <em>Privately</em>, using strong encryption built
            by SINE Foundation.
          </p>
          <div className="mt-2">
            <SubmitButton>Start</SubmitButton>
          </div>
        </form>
      </div>

      <a
        href="/about"
        className="underline decoration-sine-purple decoration-4 mb-24"
      >
        About this Benchmark
      </a>
    </div>
  );
}
