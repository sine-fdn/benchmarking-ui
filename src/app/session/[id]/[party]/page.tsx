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
    <div className="flex flex-col justify-center items-center gap-12">
      <div>
        <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
        <h2>
          by{" "}
          <a
            href="https://sine.foundation"
            className="underline decoration-sine-purple decoration-4"
          >
            SINE Foundation
          </a>
        </h2>
      </div>
      <p className="leading-8 max-w-xl">
        You&apos;ve been invited to join a private benchmark, powered by SINE
        Foundation&apos;s Secure Multi-Party Computation (MPC) engine,{" "}
        <strong>Polytune</strong>.
      </p>
      <p className="leading-8 max-w-xl">
        The benchmark will determine whether your value of{" "}
        <span className="border-4 rounded-xl border-sine-green px-2 py-1.5">
          {value_name}
        </span>{" "}
        in{" "}
        <span className="border-4 rounded-xl border-sine-green px-2 py-1.5">
          {description}
        </span>{" "}
        is within{" "}
        <span className="border-4 rounded-xl border-sine-green px-2 py-1.5">
          {interval_range}
        </span>{" "}
        % of the average of all participants.{" "}
        <strong>Your input will remain private!</strong> Sounds impossible?
      </p>
      <div className="border border-black rounded-3xl p-4">
        <p className="text-xl font-bold">Give it a try!</p>
        <form action={handleSubmission}>
          <p className="mt-6 leading-8 mb-8">
            Your public name is{" "}
            <input
              type="text"
              id="alias"
              name="alias"
              className={inputClasses}
              required
            />{" "}
            and your <em>private</em> input is{" "}
            <input
              type="number"
              id="value"
              name="value"
              className={`${inputClasses} w-32`}
              placeholder={`${value_name} in ${description}`}
              required
            />
            .
          </p>
          <SubmitButton>Submit</SubmitButton>
        </form>
      </div>
      <p className="text-center mt-4 bg-sine-red rounded-3xl px-4 py-2 border border-black">
        Please remain online until the result is shown!
      </p>
    </div>
  );
}
