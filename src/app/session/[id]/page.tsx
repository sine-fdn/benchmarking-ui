import { SubmitButton } from "@/components/SubmitButton";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";

export default function Session({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  async function startSession(formData: FormData) {
    "use server";

    const { id } = await params;

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

    redirect(`/session/${id}/links`);
  }

  const inputClasses =
    "border-4 border-sine-purple rounded-xl px-2 text-right mx-1.5";

  return (
    <>
      <form action={startSession} className="flex flex-col gap-4 items-center">
        <p className="text-l max-w-2xl text-center leading-8">
          For 3 parties, check whether their
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
            className={`w-14 ${inputClasses}`}
            placeholder="10"
            required
          />
          % range of each other. <em>Privately</em>, using strong encryption
          built by SINE Foundation.
        </p>
        <SubmitButton>Start</SubmitButton>
      </form>
    </>
  );
}
