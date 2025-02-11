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

  // const bucketClasses =
  //   "h-44 w-44 rounded-3xl border flex flex-col justify-between";
  // const aboveBucketClasses = `${bucketClasses} bg-sine-blue border-black`;
  // const withinBucketClasses = `${bucketClasses} bg-sine-yellow border-black`;
  // const belowBucketClasses = `${bucketClasses} bg-sine-red border-black`;

  return (
    <div className="flex flex-col gap-14 justify-center">
      <div className="mb-12">
        <h1 className="-mb-2">Private Multi-Party Benchmark</h1>
        <h2>
          by <a href="https://sine.foundation">SINE Foundation</a>
        </h2>
      </div>
      <div className="flex justify-between mx-16">
        <div className="flex gap-2">
          {above.map((party: { submitter: string; alias: string }) => {
            return (
              <p
                key={party.submitter}
                className="border rounded-xl border-black px-4 bg-sine-blue"
              >
                {party.alias}
              </p>
            );
          })}
        </div>
        <p className="text-right">
          {"> "}
          {interval_range}% above average
        </p>
      </div>
      <div className="border-2 border-t-sine-black border-dashed border-b-sine-black border-x-0 h-32 flex items-center justify-between">
        <div className="flex justify-between mx-16 w-full">
          <div className="flex gap-2">
            {within.map((party: { submitter: string; alias: string }) => {
              return (
                <p
                  key={party.submitter}
                  className="border rounded-xl border-black px-4 py-0 bg-sine-blue"
                >
                  {party.alias}
                </p>
              );
            })}
          </div>
          <p className="text-right">within {interval_range}% of average</p>
        </div>
      </div>
      <div className="flex justify-between mx-16">
        <div className="flex gap-2">
          {below.map((party: { submitter: string; alias: string }) => {
            return (
              <p
                key={party.submitter}
                className="border rounded-xl border-black px-4 bg-sine-blue"
              >
                {party.alias}
              </p>
            );
          })}
        </div>
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
      </div>
    </div>
  );
}
