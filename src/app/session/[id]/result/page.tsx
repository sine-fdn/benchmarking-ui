import { sql } from "@/lib/db";
import Link from "next/link";

export default async function Result({
  params,
}: {
  params: Promise<{ id: string; party: string }>;
}) {
  const { id } = await params;

  const resultDB = await sql`
    SELECT result FROM sessions WHERE session_id = ${id}
  `;

  const result = resultDB[0].result;

  const session = await sql`
    SELECT * FROM sessions WHERE session_id = ${id}
  `;

  const { interval_range } = session[0];

  type Result = "within" | "below" | "above";

  const above = result.filter((r: { result: Result }) => r.result === "above");
  const within = result.filter(
    (r: { result: Result }) => r.result === "within"
  );
  const below = result.filter((r: { result: Result }) => r.result === "below");

  function placeParticipants(group: []) {
    return group.map((party: { submitter: string; alias: string }) => {
      return (
        <p
          key={party.submitter}
          className="border rounded-xl border-black px-4 bg-sine-blue"
        >
          {party.alias}
        </p>
      );
    });
  }

  return (
    <div className="flex flex-col gap-12 justify-center mt-96 items-center">
      <div className="mb-12">
        <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
        <h2>
          by <a href="https://sine.foundation">SINE Foundation</a>
        </h2>
      </div>
      <div className="flex justify-between mx-16 gap-2">
        <div className="flex gap-2">{placeParticipants(above)}</div>
        <p className="text-right">
          {"> "}
          {interval_range}% above average
        </p>
      </div>
      <div>
        <svg className="w-full h-1" viewBox="0 0 800 5">
          <line
            x1="0"
            y1="2"
            x2="800"
            y2="2"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="10, 10"
          />
        </svg>
        <div className="h-32 flex items-center justify-between">
          <div className="flex justify-between gap-2 mx-16 w-full">
            <div className="flex gap-2">{placeParticipants(within)}</div>
            <p className="text-right">within {interval_range}% of average</p>
          </div>
        </div>
        <svg className="w-full h-1" viewBox="0 0 800 5">
          <line
            x1="0"
            y1="2"
            x2="800"
            y2="2"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="10, 10"
          />
        </svg>
      </div>
      <div className="flex justify-between mx-16 gap-2">
        <div className="flex gap-2">{placeParticipants(below)}</div>
        <p className="text-right">
          {"< "}
          {interval_range}% below average
        </p>
      </div>
      <div className="flex justify-center mt-12 flex-col items-center gap-12">
        <Link
          href={"/"}
          className="bg-sine-green border border-black rounded-3xl px-4 py-2"
        >
          Start new benchmark
        </Link>
        <Link
          href={"/about"}
          className="underline decoration-sine-purple decoration-4"
        >
          Learn more about <strong>Polytune</strong> and MPC
        </Link>
        <div className="-mt-6">
          <p className="animate-bounce -mb-4 ">∨</p>
          <p className="animate-bounce">∨</p>
        </div>
      </div>
      <div className="max-w-2xl">
        <video width="max" height="max" autoPlay loop>
          <source src="/mpc.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
