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

  const { session_id, value_name, interval_range, unit } = await getSession();

  async function handleSubmission(formData: FormData) {
    "use server";

    const { party } = await params;
    const alias = formData.get("alias") as string;
    const value = formData.get("value") as string;

    const submission = await sql`
      SELECT submissions FROM submissions WHERE session_id = ${session_id} AND submitter = ${party}
    `;

    if (submission.length != 0) {
      console.log(
        `Submission for party ${party} already exists, redirecting to waiting page`
      );
      redirect(`/session/${session_id}/${party}/waiting`);
    }

    await sql`
      INSERT INTO submissions (session_id, submitter, alias, submission)
      VALUES (${session_id}, ${party}, ${alias}, ${value})
    `;

    redirect(`/session/${session_id}/${party}/waiting`);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-12 max-w-2xl">
      <div>
        <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
        <h2>
          by <a href="https://sine.foundation">SINE Foundation</a>
        </h2>
      </div>
      <p className="leading-8 max-w-xl">
        You&apos;ve been invited to join a private benchmark, powered by SINE
        Foundation&apos;s Secure Multi-Party Computation (MPC) engine,{" "}
        <strong>Polytune</strong>.
      </p>
      <p className="leading-8 max-w-xl">
        The benchmark will determine whether your value of{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {value_name}
        </span>{" "}
        in{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {unit}
        </span>{" "}
        is within{" "}
        <span className="font-mono bg-sine-green px-2 py-1 rounded">
          {interval_range}%
        </span>{" "}
        of the average of all participants.{" "}
        <strong>Your input will remain private!</strong> Sounds impossible?
      </p>
      <div className="border border-black rounded-3xl p-4 py-6 w-2xl">
        <p className="text-xl font-bold">Give it a try!</p>
        <form action={handleSubmission}>
          <div className="leading-8 my-10">
            <div className="mb-10">
              <p>
                Your Name:{" "}
                <input
                  type="text"
                  id="alias"
                  name="alias"
                  className="border-4 border-sine-green rounded-xl px-2 text-left mx-1.5"
                  required
                />{" "}
              </p>
              <p>
                Your name is used to identify you and will be visible to the
                other participants.{" "}
              </p>
            </div>
            <div>
              <p>
                Your Input:{" "}
                <input
                  type="number"
                  id="value"
                  name="value"
                  className="border-4 rounded-xl px-2 text-left mx-1.5 border-sine-blue"
                  placeholder={`${value_name} in ${unit}`}
                  required
                />
              </p>
              <p>
                Your input is never revealed to the other participants and will
                remain encrypted.{" "}
              </p>
            </div>
          </div>
          <SubmitButton>Submit</SubmitButton>
        </form>
      </div>
    </div>
  );
}
