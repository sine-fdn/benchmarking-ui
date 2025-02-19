import Box from "@/components/Box";
import Input from "@/components/Input";
import { SubmitButton } from "@/components/SubmitButton";
import TextBlock from "@/components/TextBlock";
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
  const { party } = await params;

  async function handleSubmission(formData: FormData) {
    "use server";

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
      <TextBlock>
        You&apos;ve been invited to join a private benchmark, powered by SINE
        Foundation&apos;s Secure Multi-Party Computation (MPC) engine,{" "}
        <strong>Polytune</strong>.
      </TextBlock>
      <TextBlock>
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
        <strong>Your input will remain private and ecnrypted</strong>.
      </TextBlock>
      <Box>
        <p className="text-xl font-bold">Give it a try!</p>
        <form action={handleSubmission}>
          <div className="leading-8 my-10">
            <div className="mb-10">
              <p>
                Your Name:{" "}
                <Input
                  type="text"
                  id="alias"
                  name="alias"
                  required
                  className="w-44"
                />
              </p>
              <p>
                Your name is used to identify you and will be visible to the
                other participants.{" "}
              </p>
            </div>
            <div>
              <p>
                Your Input:{" "}
                <Input
                  type="number"
                  id="value"
                  name="value"
                  placeholder={`${value_name} in ${unit}`}
                  required
                  privateInput
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
      </Box>
    </div>
  );
}
