import { sql } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Party({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  "use server";

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

  const session = await getSession();

  async function handleSubmission(formData: FormData) {
    "use server";

    const { party } = await params;
    const alias = formData.get("alias") as string;
    const value = formData.get("value") as string;

    const session_id = session.session_id;

    await sql`
      INSERT INTO submissions (session_id, submitter, alias, submission)
      VALUES (${session_id}, ${party}, ${alias}, ${value})
    `;

    redirect(`/session/${session_id}/${party}/waiting`);
  }

  const inputClasses = "border border-green-600 rounded";

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1>Polytune</h1>
      <div className="text-justify w-1/2 mt-6">
        <p className="mb-8">
          Welcome to Polytune, SINE&apos;s Secure Multiparty Computation engine.
          Polytune allows three parties to engage in a computation without
          revealing their individual inputs. In this case, Polytune will compute
          the average of {session.value_name} and for each participant determine
          whether the difference between the average and their input is within a{" "}
          {session.interval_range} range.
        </p>
        <p className="text-center mb-6">
          <strong>Please remain online during the entire computation</strong>
        </p>
      </div>
      <form
        action={handleSubmission}
        className="flex flex-col gap-2 justify-center mx-auto mt-6 text-justify"
      >
        <label htmlFor="alias" className="">
          Please enter an alias for yourself (e.g. Alice, ACME, Bob etc.):
          <p className="text-xs">Other participants can see your alias</p>
        </label>
        <input type="text" id="alias" name="alias" className={inputClasses} />

        <label htmlFor="value" className="mt-2">
          Please enter your value for {session.value_name}:
          <p className="text-xs">Your input will remain private</p>
        </label>
        <input type="number" id="value" name="value" className={inputClasses} />
        <button
          type="submit"
          className="mt-4 mb-4 border border-green-600 rounded px-2 py-1 bg-green-200"
        >
          Submit
        </button>
      </form>
      <p className="text-justify mt-8">
        More about {session.value_name}: {session.description}
      </p>
    </div>
  );
}
