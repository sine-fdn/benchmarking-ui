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

  type Result = "within" | "below" | "above";

  const above = result.filter((r: { result: Result }) => r.result === "above");
  const within = result.filter(
    (r: { result: Result }) => r.result === "within"
  );
  const below = result.filter((r: { result: Result }) => r.result === "below");

  const bucketClasses =
    "h-44 w-44 rounded border flex flex-col justify-between";
  const aboveBucketClasses = `${bucketClasses} bg-blue-100 border-blue-400`;
  const withinBucketClasses = `${bucketClasses} bg-yellow-100 border-yellow-400`;
  const belowBucketClasses = `${bucketClasses} bg-purple-100 border-purple-400`;

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1>Result</h1>
      <div className={aboveBucketClasses}>
        <h3 className="text-blue-400">Above</h3>
        <div>
          {above.map(
            (r: { submitter: string; alias: string; result: Result }) => (
              <p key={r.submitter}>{r.alias}</p>
            )
          )}
        </div>
      </div>
      <div className={withinBucketClasses}>
        <h3 className="text-yellow-400">Within</h3>
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
