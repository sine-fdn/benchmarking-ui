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

  return (
    <div>
      <p className="text-xl my-6 text-center">
        Verify whether three values are within a certain range of each other
        without having to reveal these values in plain text
      </p>

      <form
        action={startSession}
        className="flex flex-col justify-center w-1/2 mx-auto mt-6"
      >
        <label htmlFor="valueName">Name of the Value</label>
        <input
          type="text"
          id="valueName"
          name="value_name"
          required
          className="border border-green-600 rounded mb-4"
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          required
          className="border border-green-600 rounded mb-4"
        />
        <label htmlFor="intervalRange">Interval range</label>
        <p className="text-xs mb-2">
          Polytune will privately compute for each participant whether the
          difference between the average and their input value is smaller than
          the integer provided here. E.g.: If the average is 5 and the interval
          range is 2, the participant&apos;s input value must be between 3 and 7
          to be considered within the range; if the value is 8, it will be
          considered above the range and if the value is 2, it will be
          considered below the range.
        </p>
        <input
          type="number"
          id="intervalRange"
          name="interval_range"
          required
          className="border border-green-600 rounded mb-4"
        />
        <SubmitButton>Start</SubmitButton>
      </form>
    </div>
  );
}
