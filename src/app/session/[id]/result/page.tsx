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

  const bucketClasses =
    "h-44 w-44 rounded-3xl border flex flex-col justify-between";
  const aboveBucketClasses = `${bucketClasses} bg-sine-blue border-black`;
  const withinBucketClasses = `${bucketClasses} bg-sine-yellow border-black`;
  const belowBucketClasses = `${bucketClasses} bg-sine-red border-black`;

  return (
    <div className="flex flex-col gap-4 justify-center">
      <h1>Result</h1>
      <div className={aboveBucketClasses}>
        <h3>Above {interval_range}%</h3>
        <div>
          {above.map(
            (r: { submitter: string; alias: string; result: Result }) => (
              <p key={r.submitter}>{r.alias}</p>
            )
          )}
        </div>
      </div>
      <div className={withinBucketClasses}>
        <h3>Within Average</h3>
        <div>
          {within.map(
            (r: { submitter: string; alias: string; result: Result }) => (
              <p key={r.submitter}>{r.alias}</p>
            )
          )}
        </div>
      </div>
      <div className={belowBucketClasses}>
        <h3 className="text-purple-400">Below</h3>
        <div>
          {below.map(
            (r: { submitter: string; alias: string; result: Result }) => (
              <p key={r.submitter}>{r.alias}</p>
            )
          )}
        </div>
      </div>
      <Link
        href={"/"}
        className="border border-green-600 rounded px-2 py-1 bg-green-200 mt-6 hover:bg-green-600 hover:text-white"
      >
        Start new computation
      </Link>
    </div>
  );
}
