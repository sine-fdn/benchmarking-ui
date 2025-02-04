import { SubmitButton } from "@/components/SubmitButton";
import { sql } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Party({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  async function getSession() {
    const { id } = await params;

    const session = await sql`
      SELECT * FROM sessions WHERE session_id = ${id}
    `;

    if (session.length != 1) {
      throw new Error(`Session with id ${id} not found`);
    }

    return session[0];
  }

  const { session_id, value_name, interval_range, description } =
    await getSession();

  async function handleSubmission(formData: FormData) {
    "use server";

    const { party } = await params;
    const alias = formData.get("alias") as string;
    const value = formData.get("value") as string;

    await sql`
      INSERT INTO submissions (session_id, submitter, alias, submission)
      VALUES (${session_id}, ${party}, ${alias}, ${value})
    `;

    redirect(`/session/${session_id}/${party}/waiting`);
  }

  const inputClasses =
    "border-4 border-sine-purple rounded-xl px-2 text-right mx-1.5";

  return (
    <div className="text-center flex flex-col justify-center items-center max-w-2xl">
      <h1>Welcome to Polytune</h1>
      <p className="leading-8">
        You&apos;ve been invited to join a private benchmark, powered
        by SINE&apos;s Secure Multi Party Computation engine{" "}
        <strong>Polytune</strong>.
      </p>
      <p className="text-center mt-4 leading-8">
        You have been asked to provide your input for{" "}
        <span className="border-4 rounded-xl border-sine-green px-2 py-1.5">{value_name}</span>,
        in{" "}
        <span className="border-4 rounded-xl border-sine-green px-2 py-1.5">{description}</span>.{" "}
        <strong>Your input will remain private</strong> while Polytune
        calculates the average of all three participants joining this session.
      </p>
      <p className="text-center mt-4 leading-8">
        Without disclosing inputs, Polytune will determine for each participant
        whether the difference between their input and the average is within a
        range of{" "}
        <span className="border-4 rounded-xl border-sine-green px-2 py-1.5">
          {interval_range}%
        </span>
        .
      </p>
      <form action={handleSubmission}>
        <p className="text-center mt-8 leading-8 mb-6">
          Your public alias is{" "}
          <input
            type="text"
            id="alias"
            name="alias"
            className={inputClasses}
            required
          />{" "}
          and your <strong>private</strong> input is{" "}
          <input
            type="number"
            id="value"
            name="value"
            className={`${inputClasses} w-32`}
            placeholder={`${value_name} in ${description}`}
            required
          />
        </p>
        <SubmitButton>Submit</SubmitButton>
      </form>
      <p className="text-center mt-12 bg-sine-red rounded-3xl px-4 py-2 border border-black">
        Please remain online!
      </p>
    </div>
  );
}
