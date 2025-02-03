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

  const inputClasses = "border border-green-600 rounded border-opacity-25 px-1";

  return (
    <>
      <form action={startSession} className="flex flex-col gap-4 items-center">
        <p className="text-l w-96 text-center">
          In this pilot, you can check whether three values of {" "}
          <input
            type="text"
            id="valueName"
            name="value_name"
            className={`w-24 my-2 ${inputClasses}`}
            placeholder="value name"
            required
          />{" "}
          (in{" "}
          <input
            type="text"
            id="description" // TODO: change to UNIT
            name="description" // TODO: Change to UNIT
            required
            placeholder="unit"
            className={`w-10 ${inputClasses}`}
          />
          ) are within a{" "}
          <input
            type="number"
            id="intervalRange"
            name="interval_range"
            className={`w-12 ${inputClasses}`}
            placeholder="x"
            required
          />
          % range of each other without revealing the values in plain text.
        </p>
      <SubmitButton>Start</SubmitButton>
      </form>

    </>
  );
}
