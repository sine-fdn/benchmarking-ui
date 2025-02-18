import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { sql } from "@/lib/db";
import { SubmitButton } from "@/components/SubmitButton";
import TextBlock from "@/components/TextBlock";
import Box from "@/components/Box";
import Input from "@/components/Input";

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
    const unit = formData.get("unit") as string;
    const intervalRange = formData.get("interval_range") as string;

    await sql`
      UPDATE sessions
      SET value_name = ${valueName}, unit = ${unit}, interval_range = ${intervalRange}
      WHERE session_id = ${id}
    `;

    redirect(`/session/${id}/links`);
  }

  return (
    <div className="flex flex-col justify-between items-center gap-12 max-w-2xl">
      <TextBlock>
        With SINE&apos;s private benchmark, three participants can benchmark a
        value <strong>without disclosing their inputs</strong> and{" "}
        <strong>without sharing any data with SINE</strong>.
      </TextBlock>
      <TextBlock>
        <strong>Polytune</strong>, SINE&apos;s Secure Multi-Party Computation
        (MPC) engine, brings advanced cryptography to everyone. You can use it
        in the browser, without any technical knowledge.
      </TextBlock>
      <Box>
        <p className="text-xl font-bold mb-6">Give it a try!</p>
        <form
          action={startSession}
          className="flex flex-col gap-4 items-center"
        >
          <p className="text-l max-w-2xl text-center leading-7">
            For 3 participants, check whether their
            <Input
              type="text"
              id="valueName"
              name="value_name"
              placeholder={"CO2e emissions"}
              required
              className="w-36 text-right"
            />
            in
            <Input
              type="text"
              id="unit"
              name="unit"
              required
              placeholder="kg"
              className="w-14 text-right"
            />
            are within
            <Input
              type="number"
              min="0"
              id="intervalRange"
              name="interval_range"
              className="w-16 text-right"
              placeholder="10"
              required
            />
            % of each other. <em>Privately</em>, using strong encryption built
            by SINE Foundation.
          </p>
          <SubmitButton className="mt-2">Start</SubmitButton>
        </form>
      </Box>

      <a
        href="/about"
        className="underline decoration-sine-purple decoration-4"
      >
        About this Benchmark
      </a>
    </div>
  );
}
